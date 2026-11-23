// One-time, resumable import. Reuses the project's GraphQL operations.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { print } = require('graphql');
require.extensions['.ts'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  module._compile(result.outputText, filename);
};
const { CP_CMS_CUSTOM_POST_TYPES_ADD, CP_CMS_CUSTOM_FIELD_GROUPS_ADD } = require('../src/graphql/cms/mutations/customPostType.ts');
const { CP_CMS_POSTS_ADD } = require('../src/graphql/cms/mutations/post.ts');
const { CP_CMS_CATEGORIES_ADD } = require('../src/graphql/cms/mutations/category.ts');
const { CP_CUSTOM_FIELD_GROUPS } = require('../src/graphql/cms/queries/customPostType.ts');
const { CP_POST_LIST } = require('../src/graphql/cms/queries/post.ts');
const { CP_CATEGORIES } = require('../src/graphql/cms/queries/category.ts');
const cfg = fs.readFileSync('next.config.mjs', 'utf8');
const endpoint = process.env.GRAPHQL_URL || cfg.match(/NEXT_PUBLIC_ERXES_ENDPOINT: "([^"]+)/)[1];
const token = process.env.ERXES_APP_TOKEN || cfg.match(/NEXT_PUBLIC_ERXES_APP_TOKEN: "([^"]+)/)[1];
async function query(document, variables = {}) {
  const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', 'x-app-token': token }, body: JSON.stringify({ query: print(document), variables }), signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`CMS HTTP ${res.status}: ${await res.text()}`);
  const body = await res.json();
  if (body.errors?.length) throw new Error(JSON.stringify(body.errors));
  return body.data;
}
const subjects = ['finance-basics','economics','finance-management','investment-management','corporate-finance','bank-management','bank-accounting'];
const labels = ['Санхүүгийн үндэс','Эдийн засаг','Санхүүгийн удирдлага','Хөрөнгө оруулалтын удирдлага','Корпорацийн санхүү','Банкны менежмент','Банкны НББ'];
const locales = ['mn','en','ko','ja'];
const fields = [
  ['subject', 'Хичээл / Subject', 'select', subjects],
  ['locale', 'Хэл / Language', 'select', locales],
  ['order', 'Дараалал / Order', 'number'],
  ['topic-id', 'Сэдвийн код / Topic ID', 'text'],
  ['topic-title', 'Сэдвийн нэр / Topic title', 'text'],
  ['topic-order', 'Сэдвийн дараалал / Topic order', 'number'],
  ['section', 'Хэсэг / Section', 'text'],
];
const quizFields = [
  ['question-type', 'Асуултын төрөл / Question type', 'select', ['multiple-choice','true-false','fill-in']],
  ['correct', 'Зөв хариулт / Correct (a, b, c... or text)', 'text'],
  ...['a','b','c','d','e','f','g','h'].map(x=>['option-'+x, 'Сонголт / Option '+x.toUpperCase(), 'textarea']),
];
const definition = ([code,label,type,options]) => ({ _id: 'learning-'+code, code, label, type, ...(options ? {options} : {}) });
const escape = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const html = s => '<p>'+escape(s || '').replace(/\n/g,'<br />')+'</p>';
async function main() {
  const groups = (await query(CP_CUSTOM_FIELD_GROUPS)).cpCustomFieldGroups;
  const existingTypes = groups.flatMap(g => (g.customPostTypes || []).map(t => ({...t, apiCode: t.code, code: g.code.replace("learning-", "")})));
  const manifest = fs.existsSync('src/data/learning-cms.json') ? JSON.parse(fs.readFileSync('src/data/learning-cms.json','utf8')) : { types: {}, categories: {}, version: 1 };
  for (const kind of ['flashcards','quizzes']) {
    let item = existingTypes.find(t => t.code === kind);
    if (!item) item = (await query(CP_CMS_CUSTOM_POST_TYPES_ADD,{input:{code:kind,label:kind==='quizzes'?'Quiz':'Flashcard',pluralLabel:kind==='quizzes'?'Quizzes':'Flashcards',description:'Learning questions. Title = question; Content = answer / explanation. Edit the learning custom fields for options and grouping.'}})).cpCmsCustomPostTypesAdd;
    manifest.types[kind] = item._id;
    manifest.typeCodes ??= {};
    manifest.typeCodes[kind] = item.apiCode || item.code;
  }
  for (const kind of ['flashcards','quizzes']) {
    const code = 'learning-'+kind;
    if (!groups.some(g=>g.code===code)) await query(CP_CMS_CUSTOM_FIELD_GROUPS_ADD,{input:{code,label:kind==='quizzes'?'Quiz тохиргоо':'Flashcard тохиргоо',customPostTypeIds:[manifest.types[kind]],fields:[...fields,...(kind==='quizzes'?quizFields:[])].map(definition)}});
  }
  const categories = (await query(CP_CATEGORIES,{limit:100})).cpCategories.list;
  for (const locale of locales) for (const [i,subject] of subjects.entries()) {
    const slug = `learning-${subject}-${locale}`;
    let category = manifest.categories[`${subject}:${locale}`] ? { _id: manifest.categories[`${subject}:${locale}`] } : categories.find(c=>c.name===`[${locale.toUpperCase()}] ${labels[i]}`);
    if (!category) category = (await query(CP_CMS_CATEGORIES_ADD,{input:{name:`[${locale.toUpperCase()}] ${labels[i]}`,slug,status:'active',description:'Learning subject and language. Select this category when adding a question.'}})).cpCmsCategoriesAdd;
    manifest.categories[`${subject}:${locale}`] = category._id;
  }
  fs.writeFileSync('src/data/learning-cms.json', JSON.stringify(manifest,null,2)+'\n');
  const key = post => { const f = Object.fromEntries((post.customFieldsData || []).map(item => [item.field, item.value])); return [post.type, f["learning-subject"], f["learning-locale"], f["learning-topic-id"], f["learning-order"]].join("|"); };
  const known = new Set();
  for (const type of Object.values(manifest.typeCodes)) {
    let cursor;
    for (;;) {
      const list = (await query(CP_POST_LIST,{type,limit:100,cursor,sortField:'_id',sortDirection:'asc'})).cpPostList;
      for(const post of list.posts) known.add(key(post));
      if(!list.posts.length || !list.pageInfo?.hasNextPage) break;
      if(cursor===list.pageInfo.endCursor) throw new Error('CMS cursor did not advance');
      cursor=list.pageInfo.endCursor;
    }
  }
  const rows=[];
  for(const kind of ['flashcards','quizzes']) for(const file of fs.readdirSync('src/data/'+kind).filter(x=>x.endsWith('.json'))) {
    const stem=file.slice(0,-5),match=stem.match(/-(mn|en|ko|ja)$/),locale=match?match[1]:'mn',subject=match?stem.slice(0,-3):stem;
    const data=JSON.parse(fs.readFileSync(path.join('src/data',kind,file),'utf8'));
    const topics=Array.isArray(data)?[{id:'',title:'',items:data}]:data.topics.map(t=>({...t,items:t.cards||t.questions}));
    for(const [topicIndex,topic] of topics.entries()) for(const [index,item] of topic.items.entries()) {
      const slug=`learning-${kind}-${subject}-${locale}-${topic.id||'main'}-${item.id}`;
      const values={subject,locale,order:String(index+1),'topic-id':topic.id,'topic-title':topic.title,'topic-order':String(topicIndex+1),section:item.section||''};
      if(kind==='quizzes') { values['question-type']=item.type;values.correct=item.correct;for(const option of item.options||[]){if(!/^[a-h]$/.test(option.label))throw new Error('Unsupported option label: '+option.label);values['option-'+option.label]=option.text;} }
      rows.push({slug,type:manifest.types[kind],title:item.question,content:html(kind==='flashcards'?item.answer:item.explanation),categoryIds:[manifest.categories[`${subject}:${locale}`]],status:'published',customFieldsData:Object.entries(values).map(([key,value])=>({field:'learning-'+key,value}))});
    }
  }
  if(new Set(rows.map(r=>r.slug)).size!==rows.length)throw new Error('Duplicate source IDs');
  const pending=rows.filter(r=>!known.has(key(r)));
  console.log(`Source ${rows.length}; already imported ${rows.length-pending.length}; pending ${pending.length}`);
  if(process.argv.includes('--schema-only'))return;
  let done=0;
  // Four independent creates at a time. Resume by stable custom-field identity; CMS generates its own slugs.
  for(let i=0;i<pending.length;i+=4){await Promise.all(pending.slice(i,i+4).map(async input=>{await query(CP_CMS_POSTS_ADD,{input});done++;}));if(done%100===0||done===pending.length)console.log(`Imported ${done}/${pending.length}`);}
  console.log('Import complete. Original JSON files retained as backup.');
}
main().catch(e=>{console.error(e.message);process.exitCode=1});

