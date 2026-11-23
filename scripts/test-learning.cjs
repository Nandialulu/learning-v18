require('./ts-loader.cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { parseLearningPosts, learningText, learningCount } = require('../src/lib/learning-content.ts');
const { fetchLearningPosts } = require('../src/lib/learning-api.ts');

const post = (id, fields = {}, overrides = {}) => ({
  _id: id, status: 'published', title: 'Question ' + id, content: '<p>Answer &lt; 2<br />Second line</p>',
  customFieldsData: Object.entries(fields).map(([key, value]) => ({ field: 'learning-' + key, value })), ...overrides,
});

test('CMS rich text preserves formulas, newlines and entities without executing markup', () => {
  assert.equal(learningText('<p>r &lt; 0 &amp; x &gt; 1<br />Next</p><script>bad()</script>'), 'r < 0 & x > 1\nNext');
});
test('topics and numeric order survive import; drafts disappear', () => {
  const data = parseLearningPosts([post('b',{order:'10','topic-id':'supply','topic-title':'Supply'}),post('a',{order:'2','topic-id':'supply','topic-title':'Supply'}),post('c',{}, {status:'draft'})], 'flashcards');
  assert.equal(learningCount(data,'flashcards'),2);
  assert.equal(data.topics[0].id,'supply');
  assert.deepEqual(data.topics[0].cards.map(card=>card.question),['Question a','Question b']);
  assert.equal(learningCount(parseLearningPosts([], 'flashcards'),'flashcards'),0);
});
test('choice labels and fill-in answers retain scoring semantics', () => {
  const data = parseLearningPosts([post('a',{'question-type':'multiple-choice',correct:'b','option-a':'First','option-b':'Second',order:1}),post('b',{'question-type':'fill-in',correct:'12.5',order:2})],'quizzes');
  assert.equal(data.questions[0].correct,'b');
  assert.deepEqual(data.questions[0].options,[{label:'a',text:'First'},{label:'b',text:'Second'}]);
  assert.equal(data.questions[1].correct,'12.5');
  assert.throws(()=>parseLearningPosts([post('bad',{'question-type':'multiple-choice',correct:'z','option-a':'A','option-b':'B'})],'quizzes'),/correct answer invalid/);
});
test('pagination reads every page and refuses repeated cursors or duplicates', async () => {
  const seen = [];
  const client = { query: async ({variables}) => { seen.push(variables.cursor); return {data:{cpPostList: variables.cursor ? { posts:[post('b')],pageInfo:{hasNextPage:false} } : { posts:[post('a')],pageInfo:{hasNextPage:true,endCursor:'next'} }}}; } };
  assert.equal((await fetchLearningPosts(client,'flashcards','economics','mn')).length,2);
  assert.deepEqual(seen,[undefined,'next']);
  const stuck = {query:async()=>({data:{cpPostList:{posts:[post('a')],pageInfo:{hasNextPage:true,endCursor:'same'}}}})};
  await assert.rejects(()=>fetchLearningPosts(stuck,'flashcards','economics','mn'),/pagination did not advance/);
});

test('legacy fill-in rows turn their single marked answer into a blank without inventing answers', () => {
  const data = parseLearningPosts([post('legacy', {'question-type':'fill-in', correct:''}, {title:'Money becomes **investment**.'})], 'quizzes');
  assert.equal(data.questions[0].question, 'Money becomes ____.');
  assert.equal(data.questions[0].correct, 'investment');
  assert.throws(()=>parseLearningPosts([post('missing', {'question-type':'fill-in',correct:''})],'quizzes'),/correct answer invalid/);
});
