require('./ts-loader.cjs');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { print } = require('graphql');
const { fetchLearningPosts } = require('../src/lib/learning-api.ts');
const { parseLearningPosts, learningCount } = require('../src/lib/learning-content.ts');
const cfg = fs.readFileSync('next.config.mjs', 'utf8');
const endpoint = process.env.GRAPHQL_URL || cfg.match(/NEXT_PUBLIC_ERXES_ENDPOINT: "([^"]+)/)[1];
const token = process.env.ERXES_APP_TOKEN || cfg.match(/NEXT_PUBLIC_ERXES_APP_TOKEN: "([^"]+)/)[1];
const client = { query: async ({query, variables}) => {
  const response = await fetch(endpoint, {method:'POST',headers:{'content-type':'application/json','x-app-token':token},body:JSON.stringify({query:print(query),variables}),signal:AbortSignal.timeout(60000)});
  const result = await response.json();
  if(!response.ok || result.errors) throw new Error(JSON.stringify(result.errors));
  return result;
}};

async function main() {
  const totals = {flashcards:0, quizzes:0};
  for (const kind of ['flashcards','quizzes']) {
    for (const file of fs.readdirSync('src/data/'+kind).filter(file=>file.endsWith('.json'))) {
      const stem=file.slice(0,-5), match=stem.match(/-(mn|en|ko|ja)$/), locale=match?match[1]:'mn',subject=match?stem.slice(0,-3):stem;
      const original=JSON.parse(fs.readFileSync('src/data/'+kind+'/'+file,'utf8'));
      const posts=await fetchLearningPosts(client,kind,subject,locale);
      const data=parseLearningPosts(posts,kind);
      const source=Array.isArray(original)?original:original.topics.flatMap(topic=>topic.cards||topic.questions);
      const imported=kind==='flashcards'?[...data.cards,...data.topics.flatMap(topic=>topic.cards)]:[...data.questions,...data.quizTopics.flatMap(topic=>topic.questions)];
      const normalize = item => kind==='flashcards' ? {question:item.question,answer:item.answer.trim()} : {question:item.question,type:item.type,correct:item.correct,options:[...(item.options||[])].sort((a,b)=>a.label.localeCompare(b.label)),explanation:(item.explanation||'').trim(),section:item.section||''};
      assert.deepEqual(imported.map(normalize), source.map(item => {
        if (item.type === 'fill-in' && !item.correct) {
          const marked = [...item.question.matchAll(/\*\*([^*]+)\*\*/g)];
          assert.equal(marked.length, 1, 'Missing or ambiguous source answer');
          return normalize({...item, question:item.question.replace(marked[0][0], '____'), correct:marked[0][1].trim()});
        }
        return normalize(item);
      }), `${kind}/${file}: content differs`);
      if (!Array.isArray(original)) assert.deepEqual((kind==='flashcards'?data.topics:data.quizTopics).map(topic=>({id:topic.id,title:topic.title})),original.topics.map(topic=>({id:topic.id,title:topic.title})),`${file}: topics differ`);
      totals[kind]+=learningCount(data,kind);
      console.log(`PASS ${kind}/${file}: ${imported.length}`);
    }
  }
  console.log('Verified every source question, answer, choice, explanation and topic:',totals);
}
main().catch(error=>{console.error(error.message.slice(0,2500));process.exitCode=1});
