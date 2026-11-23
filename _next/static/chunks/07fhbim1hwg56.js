(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,66283,e=>{"use strict";var t=e.i(44180),n=e.i(34776),a=e.i(91546),s=e.i(80112);e.s(["default",0,function({slug:e,children:i,showTitle:r=!0}){let o=(0,a.useCmsPage)(e),l=(0,n.useLocale)();if(!o)return(0,t.jsx)(t.Fragment,{children:i});let d=(0,s.cmsBody)(o,l);if(!d&&!o.name)return(0,t.jsx)(t.Fragment,{children:i});let c=o.content&&o.description&&!/<\/?[a-z][\s\S]*>/i.test(o.description)?o.description:null;return(0,t.jsxs)("div",{"data-cms-page":e,children:[r&&o.name&&(0,t.jsx)("h1",{className:"text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl",children:o.name}),c&&(0,t.jsx)("p",{className:"mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground",children:c}),d&&(0,t.jsx)("div",{className:"cms-content mx-auto mt-6 max-w-[800px] text-lg leading-relaxed text-muted-foreground",dangerouslySetInnerHTML:{__html:d}})]})}])},50456,(e,t,n)=>{t.exports={types:{flashcards:"5s1Y8Q1iRG-O2nBdQ0cO3",quizzes:"zPG2a3aamol7iHD-iIJz8"},categories:{"finance-basics:mn":"5xVDoq5Yd7KKXSTmrUSmt","economics:mn":"aSfs7uEd1EYTKJh5f7xkv","finance-management:mn":"uo5XhQ-e7CoZSyEE_UjYC","investment-management:mn":"3wPwp3Ee0qrjnGweyyQPq","corporate-finance:mn":"cBQVt3i3su6LXh68MbyDw","bank-management:mn":"eM7dVwjiXOviKLUNA4Dbl","bank-accounting:mn":"MDPKeEJIfoo-zQM5d8lSg","finance-basics:en":"57mcEXYTDkkEVq8CVdPVY","economics:en":"HeAw55JeWZ88B1f2-jZA1","finance-management:en":"8zIUkfZGzR3MCxeo4mpdh","investment-management:en":"-pNB-cBO4eyNOCrDGq99r","corporate-finance:en":"eyeq1CS8cMrz2RjPgeRfq","bank-management:en":"0HQDSbc6-WKtUgCGiysyg","bank-accounting:en":"_ED7daWypHT6LvNBTgeTi","finance-basics:ko":"lf2iy7mTCZk2ZYpNk1rQ9","economics:ko":"r8phvuQpiZqUNRHr-GrxG","finance-management:ko":"dVxmSXklZyf-NrKZ-ZQWd","investment-management:ko":"qEy9Ab_fh9dWi4Q5XdLe4","corporate-finance:ko":"LHM9nHJidAdWKOLD_CP7D","bank-management:ko":"dXuCsgWw0aE5_igIVk9Ot","bank-accounting:ko":"IU5CJ3CzxgHWEts-JwS0g","finance-basics:ja":"GzMPyTZsOUd13ekmYAlBy","economics:ja":"ooF03__034NL-yeIw62I8","finance-management:ja":"n4sey5rnSB68OyXnCBwQO","investment-management:ja":"2CdOiDoRYdcY58yAWXGoB","corporate-finance:ja":"TnQFQi0azZd5380lLcM1S","bank-management:ja":"PSkLSSk5JHaGulZVmVmDy","bank-accounting:ja":"JLmFsXD6W-Dd4VkLMxqIF"},version:1,typeCodes:{flashcards:"flashcards_2",quizzes:"quizzes"}}},20959,e=>{"use strict";var t=e.i(91583);let n=t.gql`
  fragment PostFields on Post {
    _id
    type
    webId
    clientPortalId
    title
    slug
    excerpt
    content
    status
    featured
    featuredDate
    publishedDate
    scheduledDate
    viewCount
    reactionCounts
    thumbnail {
      name
      url
      type
      size
    }
    images {
      name
      url
      type
      size
    }
    videoUrl
    categoryIds
    categories {
      _id
      name
      slug
    }
    tagIds
    tags {
      _id
      name
      slug
      colorCode
    }
    customFieldsData
    createdAt
    updatedAt
  }
`;t.gql`
  ${n}
  query CpPost(
    $_id: String
    $slug: String
    $identifier: String
    $language: String
  ) {
    cpPost(
      _id: $_id
      slug: $slug
      identifier: $identifier
      language: $language
    ) {
      ...PostFields
    }
  }
`,t.gql`
  ${n}
  query CpPosts(
    $language: String
    $webId: String
    $featured: Boolean
    $type: String
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
    $dateField: PostDateField
    $dateFrom: Date
    $dateTo: Date
    $cursor: String
    $limit: Int
  ) {
    cpPosts(
      language: $language
      webId: $webId
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
      dateField: $dateField
      dateFrom: $dateFrom
      dateTo: $dateTo
      cursor: $cursor
      limit: $limit
    ) {
      ...PostFields
    }
  }
`;let a=t.gql`
  ${n}
  query CpPostList(
    $language: String
    $webId: String
    $featured: Boolean
    $type: String
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
    $dateField: PostDateField
    $dateFrom: Date
    $dateTo: Date
    $cursor: String
    $limit: Int
  ) {
    cpPostList(
      language: $language
      webId: $webId
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
      dateField: $dateField
      dateFrom: $dateFrom
      dateTo: $dateTo
      cursor: $cursor
      limit: $limit
    ) {
      posts {
        ...PostFields
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;t.gql`
  ${n}
  query CpMostViewedPosts(
    $days: Int!
    $limit: Int
    $language: String
    $webId: String
    $type: String
  ) {
    cpMostViewedPosts(
      days: $days
      limit: $limit
      language: $language
      webId: $webId
      type: $type
    ) {
      ...PostFields
    }
  }
`;var s=e.i(50456);function i(e,t,n){let a=s.default.categories[`${t}:${n}`];if(!a)throw Error(`Unknown learning category: ${t}:${n}`);return{type:s.default.typeCodes[e],categoryIds:[a],status:"published",sortField:"_id",sortDirection:"asc"}}async function r(e,t,n,s){let r,o=[],l=new Set;for(;;){let{data:d}=await e.query({query:a,variables:{...i(t,n,s),limit:100,cursor:r},fetchPolicy:"no-cache"}),c=d?.cpPostList;if(!c)throw Error("CMS returned no learning response");if(o.push(...c.posts),!c.pageInfo?.hasNextPage)break;let u=c.pageInfo.endCursor;if(!u||l.has(u)||!c.posts.length)throw Error("CMS pagination did not advance");l.add(u),r=u}if(new Set(o.map(e=>e._id)).size!==o.length)throw Error("CMS returned duplicate questions");return o}async function o(e,t,n,s){let{data:r}=await e.query({query:a,variables:{...i(t,n,s),limit:1},fetchPolicy:"no-cache"});if("number"!=typeof r?.cpPostList?.totalCount)throw Error("CMS count missing");return r.cpPostList.totalCount}e.s(["fetchLearningCount",0,o,"fetchLearningPosts",0,r],20959)},17519,e=>{"use strict";var t=e.i(64556),n=e.i(34776),a=e.i(51672),s=e.i(20959);e.s(["useLearningCounts",0,function(e){let i=(0,n.useLocale)(),[r,o]=(0,t.useState)(null),l=Object.keys(e).sort().join(",");return(0,t.useEffect)(()=>{let e=!1,t=(0,a.getApolloClient)();for(let n of l.split(",").filter(Boolean))Promise.all([(0,s.fetchLearningCount)(t,"flashcards",n,i),(0,s.fetchLearningCount)(t,"quizzes",n,i)]).then(([t,a])=>{e||o(e=>({locale:i,counts:{...e?.locale===i?e.counts:{},[n]:{flashcards:t,quizzes:a}}}))}).catch(()=>{});return()=>{e=!0}},[i,l]),{...e,...r?.locale===i?r.counts:{}}}])},72897,e=>{"use strict";var t=e.i(44180),n=e.i(33010),a=e.i(66283),s=e.i(93322),i=e.i(44705),r=e.i(92774),o=e.i(60630),l=e.i(17519);let d=[{key:"financeBasics",slug:"finance-basics",color:"bg-indigo-100",dot:"bg-primary"},{key:"economics",slug:"economics",color:"bg-rose-100",dot:"bg-secondary"},{key:"financeManagement",slug:"finance-management",color:"bg-emerald-100",dot:"bg-accent"},{key:"investmentManagement",slug:"investment-management",color:"bg-amber-100",dot:"bg-warning"},{key:"corporateFinance",slug:"corporate-finance",color:"bg-sky-100",dot:"bg-success"},{key:"bankManagement",slug:"bank-management",color:"bg-lime-100",dot:"bg-success"},{key:"bankAccounting",slug:"bank-accounting",color:"bg-violet-100",dot:"bg-violet-500"}];e.s(["default",0,function({counts:e}){let c=(0,s.useTranslations)("subjects"),u=(0,s.useTranslations)("portfolio"),g=(0,o.useReducedMotion)(),m=(0,l.useLearningCounts)(e);return(0,t.jsx)("div",{className:"w-full px-6 py-16 lg:px-[60px] lg:py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-[1000px]",children:[(0,t.jsxs)(a.default,{slug:"portfolio",children:[(0,t.jsx)(r.FadeIn,{children:(0,t.jsx)("h1",{className:"text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl",children:u("pageTitle")})}),(0,t.jsx)(r.FadeIn,{delay:.1,children:(0,t.jsx)("p",{className:"mx-auto mt-4 max-w-[640px] text-center text-lg text-muted-foreground",children:u("subtitle")})})]}),(0,t.jsx)("div",{className:"mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:d.map((e,a)=>{let s=m[e.slug]??{flashcards:0,quizzes:0},o=`${c("flashcardsCount",{count:s.flashcards})} \xb7 ${c("quizzesCount",{count:s.quizzes})}`;return(0,t.jsx)(r.FadeIn,{delay:.1+.08*a,children:(0,t.jsxs)(n.motion.div,{whileHover:g?{}:{y:-4,scale:1.01},className:`flex h-64 flex-col justify-between rounded-2xl ${e.color} p-6 transition-shadow hover:shadow-md`,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:`mb-4 h-12 w-12 rounded-full ${e.dot}`}),(0,t.jsx)("h2",{className:"text-2xl font-bold text-foreground",children:c(e.key)}),(0,t.jsx)("p",{className:"mt-1 text-sm text-muted-foreground",children:o})]}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[s.flashcards>0?(0,t.jsx)(i.Link,{href:`/flashcards/${e.slug}`,className:"inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white",children:"Flashcards"}):(0,t.jsx)("span",{className:"inline-flex items-center rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-muted-foreground",children:c("comingSoon")}),s.quizzes>0&&(0,t.jsx)(i.Link,{href:`/quiz/${e.slug}`,className:"inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white",children:c("quizLink")})]})]})},e.key)})})]})})}])}]);