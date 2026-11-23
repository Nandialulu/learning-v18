(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,66283,e=>{"use strict";var t=e.i(44180),s=e.i(34776),a=e.i(91546),n=e.i(80112);e.s(["default",0,function({slug:e,children:i,showTitle:r=!0}){let l=(0,a.useCmsPage)(e),o=(0,s.useLocale)();if(!l)return(0,t.jsx)(t.Fragment,{children:i});let d=(0,n.cmsBody)(l,o);if(!d&&!l.name)return(0,t.jsx)(t.Fragment,{children:i});let c=l.content&&l.description&&!/<\/?[a-z][\s\S]*>/i.test(l.description)?l.description:null;return(0,t.jsxs)("div",{"data-cms-page":e,children:[r&&l.name&&(0,t.jsx)("h1",{className:"text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl",children:l.name}),c&&(0,t.jsx)("p",{className:"mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground",children:c}),d&&(0,t.jsx)("div",{className:"cms-content mx-auto mt-6 max-w-[800px] text-lg leading-relaxed text-muted-foreground",dangerouslySetInnerHTML:{__html:d}})]})}])},50456,(e,t,s)=>{t.exports={types:{flashcards:"5s1Y8Q1iRG-O2nBdQ0cO3",quizzes:"zPG2a3aamol7iHD-iIJz8"},categories:{"finance-basics:mn":"5xVDoq5Yd7KKXSTmrUSmt","economics:mn":"aSfs7uEd1EYTKJh5f7xkv","finance-management:mn":"uo5XhQ-e7CoZSyEE_UjYC","investment-management:mn":"3wPwp3Ee0qrjnGweyyQPq","corporate-finance:mn":"cBQVt3i3su6LXh68MbyDw","bank-management:mn":"eM7dVwjiXOviKLUNA4Dbl","bank-accounting:mn":"MDPKeEJIfoo-zQM5d8lSg","finance-basics:en":"57mcEXYTDkkEVq8CVdPVY","economics:en":"HeAw55JeWZ88B1f2-jZA1","finance-management:en":"8zIUkfZGzR3MCxeo4mpdh","investment-management:en":"-pNB-cBO4eyNOCrDGq99r","corporate-finance:en":"eyeq1CS8cMrz2RjPgeRfq","bank-management:en":"0HQDSbc6-WKtUgCGiysyg","bank-accounting:en":"_ED7daWypHT6LvNBTgeTi","finance-basics:ko":"lf2iy7mTCZk2ZYpNk1rQ9","economics:ko":"r8phvuQpiZqUNRHr-GrxG","finance-management:ko":"dVxmSXklZyf-NrKZ-ZQWd","investment-management:ko":"qEy9Ab_fh9dWi4Q5XdLe4","corporate-finance:ko":"LHM9nHJidAdWKOLD_CP7D","bank-management:ko":"dXuCsgWw0aE5_igIVk9Ot","bank-accounting:ko":"IU5CJ3CzxgHWEts-JwS0g","finance-basics:ja":"GzMPyTZsOUd13ekmYAlBy","economics:ja":"ooF03__034NL-yeIw62I8","finance-management:ja":"n4sey5rnSB68OyXnCBwQO","investment-management:ja":"2CdOiDoRYdcY58yAWXGoB","corporate-finance:ja":"TnQFQi0azZd5380lLcM1S","bank-management:ja":"PSkLSSk5JHaGulZVmVmDy","bank-accounting:ja":"JLmFsXD6W-Dd4VkLMxqIF"},version:1,typeCodes:{flashcards:"flashcards_2",quizzes:"quizzes"}}},20959,e=>{"use strict";var t=e.i(91583);let s=t.gql`
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
  ${s}
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
  ${s}
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
  ${s}
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
  ${s}
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
`;var n=e.i(50456);function i(e,t,s){let a=n.default.categories[`${t}:${s}`];if(!a)throw Error(`Unknown learning category: ${t}:${s}`);return{type:n.default.typeCodes[e],categoryIds:[a],status:"published",sortField:"_id",sortDirection:"asc"}}async function r(e,t,s,n){let r,l=[],o=new Set;for(;;){let{data:d}=await e.query({query:a,variables:{...i(t,s,n),limit:100,cursor:r},fetchPolicy:"no-cache"}),c=d?.cpPostList;if(!c)throw Error("CMS returned no learning response");if(l.push(...c.posts),!c.pageInfo?.hasNextPage)break;let u=c.pageInfo.endCursor;if(!u||o.has(u)||!c.posts.length)throw Error("CMS pagination did not advance");o.add(u),r=u}if(new Set(l.map(e=>e._id)).size!==l.length)throw Error("CMS returned duplicate questions");return l}async function l(e,t,s,n){let{data:r}=await e.query({query:a,variables:{...i(t,s,n),limit:1},fetchPolicy:"no-cache"});if("number"!=typeof r?.cpPostList?.totalCount)throw Error("CMS count missing");return r.cpPostList.totalCount}e.s(["fetchLearningCount",0,l,"fetchLearningPosts",0,r],20959)},17519,e=>{"use strict";var t=e.i(64556),s=e.i(34776),a=e.i(51672),n=e.i(20959);e.s(["useLearningCounts",0,function(e){let i=(0,s.useLocale)(),[r,l]=(0,t.useState)(null),o=Object.keys(e).sort().join(",");return(0,t.useEffect)(()=>{let e=!1,t=(0,a.getApolloClient)();for(let s of o.split(",").filter(Boolean))Promise.all([(0,n.fetchLearningCount)(t,"flashcards",s,i),(0,n.fetchLearningCount)(t,"quizzes",s,i)]).then(([t,a])=>{e||l(e=>({locale:i,counts:{...e?.locale===i?e.counts:{},[s]:{flashcards:t,quizzes:a}}}))}).catch(()=>{});return()=>{e=!0}},[i,o]),{...e,...r?.locale===i?r.counts:{}}}])},71178,54467,88005,e=>{"use strict";var t=e.i(98107);let s=(0,t.default)("layers",[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]]);e.s(["Layers",0,s],71178);let a=(0,t.default)("zap",[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]]);e.s(["Zap",0,a],54467);let n=(0,t.default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);e.s(["TrendingUp",0,n],88005)},77626,e=>{"use strict";let t=(0,e.i(98107).default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);e.s(["ArrowRight",0,t],77626)},77258,e=>{"use strict";var t=e.i(44180),s=e.i(66283),a=e.i(33010),n=e.i(93322),i=e.i(44705),r=e.i(92774),l=e.i(60630),o=e.i(77626);e.s(["default",0,function(){let e=(0,n.useTranslations)("hero"),d=(0,l.useReducedMotion)();return(0,t.jsxs)("section",{className:"relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center lg:px-[60px] lg:py-32",children:[(0,t.jsx)(r.FadeIn,{delay:0,children:(0,t.jsx)("span",{className:"mb-6 inline-block rounded-full bg-accent px-4 py-2 text-xs font-bold tracking-wider text-accent-foreground",children:e("tagline")})}),(0,t.jsx)(r.FadeIn,{delay:.1,children:(0,t.jsx)("h1",{className:"max-w-[900px] whitespace-pre-line text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[80px]",children:e("title")})}),(0,t.jsx)(r.FadeIn,{delay:.2,children:(0,t.jsx)(s.default,{slug:"home",showTitle:!1,children:(0,t.jsx)("p",{className:"mt-6 max-w-[640px] text-lg leading-relaxed text-muted-foreground",children:e("subtitle")})})}),(0,t.jsx)(r.FadeIn,{delay:.3,children:(0,t.jsxs)("div",{className:"mt-8 flex flex-col gap-4 sm:flex-row",children:[(0,t.jsx)(a.motion.div,{whileHover:d?{}:{scale:1.02},whileTap:d?{}:{scale:.98},children:(0,t.jsx)(i.Link,{href:"/services",className:"inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-lg",children:e("ctaStart")})}),(0,t.jsx)(a.motion.div,{whileHover:d?{}:{scale:1.02},whileTap:d?{}:{scale:.98},children:(0,t.jsx)(i.Link,{href:"/portfolio",className:"inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-8 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted",children:e("ctaBrowse")})})]})}),(0,t.jsx)(r.FadeIn,{delay:.4,className:"mt-12",children:(0,t.jsxs)("div",{className:"flex flex-col items-center gap-6 sm:flex-row",children:[(0,t.jsx)(i.Link,{href:"/flashcards/finance-basics",className:"group block",children:(0,t.jsxs)("div",{className:"flex h-36 w-56 flex-col justify-center rounded-2xl bg-primary p-6 text-left text-primary-foreground shadow-lg transition-transform group-hover:scale-[1.02]",children:[(0,t.jsx)("span",{className:"text-xs font-bold tracking-wider",children:"FLASHCARD"}),(0,t.jsx)("p",{className:"mt-2 text-sm leading-relaxed",children:"What is the powerhouse of the cell?"}),(0,t.jsxs)("span",{className:"mt-3 inline-flex items-center text-xs font-semibold opacity-90",children:[e("flashcardsLink"),(0,t.jsx)(o.ArrowRight,{size:14,className:"ml-1"})]})]})}),(0,t.jsxs)("div",{className:"flex h-36 w-56 flex-col justify-center rounded-2xl bg-secondary p-6 text-left text-secondary-foreground shadow-lg",children:[(0,t.jsx)("span",{className:"text-xs font-bold tracking-wider",children:"QUIZ"}),(0,t.jsx)("p",{className:"mt-2 text-sm leading-relaxed",children:"Mitochondria is the correct answer."})]})]})})]})}])},14999,e=>{"use strict";var t=e.i(44180),s=e.i(33010),a=e.i(93322),n=e.i(44705),i=e.i(92774),r=e.i(60630),l=e.i(71178),o=e.i(54467),d=e.i(88005),c=e.i(77626);let u=[l.Layers,o.Zap,d.TrendingUp],m=["bg-primary text-primary-foreground","bg-secondary text-secondary-foreground","bg-accent text-accent-foreground"],g=["flashcards","quiz","progress"];e.s(["default",0,function(){let e=(0,a.useTranslations)("features"),l=(0,r.useReducedMotion)();return(0,t.jsx)("section",{className:"w-full px-6 py-20 lg:px-[60px] lg:py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-[1000px] text-center",children:[(0,t.jsx)(i.FadeIn,{children:(0,t.jsx)("h2",{className:"text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[44px]",children:e("title")})}),(0,t.jsx)(i.FadeIn,{delay:.1,children:(0,t.jsx)("p",{className:"mt-4 text-lg text-muted-foreground",children:e("subtitle")})}),(0,t.jsx)("div",{className:"mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:g.map((a,r)=>{let o=u[r],d="flashcards"===a,g=(0,t.jsxs)(s.motion.div,{whileHover:l?{}:{y:-4,scale:1.01},className:"flex h-full flex-col rounded-2xl border border-border bg-card p-8 text-left shadow-sm transition-shadow hover:shadow-md",children:[(0,t.jsx)("div",{className:`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${m[r]}`,children:(0,t.jsx)(o,{size:24})}),(0,t.jsx)("h3",{className:"text-xl font-bold text-card-foreground",children:e(`${a}Title`)}),(0,t.jsx)("p",{className:"mt-2 text-sm leading-relaxed text-muted-foreground",children:e(`${a}Desc`)}),d&&(0,t.jsxs)("span",{className:"mt-4 inline-flex items-center text-sm font-semibold text-primary",children:[e("flashcardsLink"),(0,t.jsx)(c.ArrowRight,{size:16,className:"ml-1"})]})]});return(0,t.jsx)(i.FadeIn,{delay:.1+.1*r,children:d?(0,t.jsx)(n.Link,{href:"/flashcards/finance-basics",className:"block h-full",children:g}):g},a)})})]})})}])},49256,e=>{"use strict";var t=e.i(44180),s=e.i(33010),a=e.i(93322),n=e.i(44705),i=e.i(92774),r=e.i(60630),l=e.i(17519);let o=[{key:"financeBasics",slug:"finance-basics"},{key:"economics",slug:"economics"},{key:"financeManagement",slug:"finance-management"},{key:"investmentManagement",slug:"investment-management"},{key:"bankManagement",slug:"bank-management"},{key:"bankAccounting",slug:"bank-accounting"}],d=["bg-indigo-100","bg-rose-100","bg-emerald-100","bg-amber-100","bg-violet-100","bg-sky-100"],c=["bg-primary","bg-secondary","bg-accent","bg-warning","bg-violet-500","bg-success"];e.s(["default",0,function({counts:e}){let u=(0,a.useTranslations)("subjects"),m=(0,r.useReducedMotion)(),g=(0,l.useLearningCounts)(e);return(0,t.jsx)("section",{className:"w-full px-6 py-20 lg:px-[60px] lg:py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-[1000px] text-center",children:[(0,t.jsx)(i.FadeIn,{children:(0,t.jsx)("h2",{className:"text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[44px]",children:u("title")})}),(0,t.jsx)(i.FadeIn,{delay:.1,children:(0,t.jsx)("p",{className:"mt-4 text-lg text-muted-foreground",children:u("subtitle")})}),(0,t.jsx)("div",{className:"mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",children:o.map((e,a)=>{let r=g[e.slug]??{flashcards:0,quizzes:0},l=`${u("flashcardsCount",{count:r.flashcards})} \xb7 ${u("quizzesCount",{count:r.quizzes})}`;return(0,t.jsx)(i.FadeIn,{delay:.1+.1*a,children:(0,t.jsxs)(s.motion.div,{whileHover:m?{}:{y:-4,scale:1.01},className:`flex h-full flex-col justify-between rounded-2xl ${d[a]} p-6 text-left transition-shadow hover:shadow-md`,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:`mb-4 h-10 w-10 rounded-full ${c[a]}`}),(0,t.jsx)("h3",{className:"text-xl font-bold text-foreground",children:u(e.key)}),(0,t.jsx)("p",{className:"mt-1 text-sm text-muted-foreground",children:l})]}),(0,t.jsxs)("div",{className:"mt-5 flex flex-wrap items-center gap-2",children:[r.flashcards>0?(0,t.jsx)(n.Link,{href:`/flashcards/${e.slug}`,className:"inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white",children:"Flashcards"}):(0,t.jsx)("span",{className:"inline-flex items-center rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-muted-foreground",children:u("comingSoon")}),r.quizzes>0&&(0,t.jsx)(n.Link,{href:`/quiz/${e.slug}`,className:"inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white",children:u("quizLink")})]})]})},e.key)})})]})})}])},56051,e=>{"use strict";var t=e.i(44180),s=e.i(33010),a=e.i(93322),n=e.i(44705),i=e.i(92774),r=e.i(60630);e.s(["default",0,function(){let e=(0,a.useTranslations)("cta"),l=(0,r.useReducedMotion)();return(0,t.jsx)("section",{className:"w-full px-6 py-20 lg:px-[60px] lg:py-24",children:(0,t.jsx)(i.FadeIn,{children:(0,t.jsxs)("div",{className:"mx-auto max-w-[1000px] rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold tracking-tight md:text-4xl",children:e("title")}),(0,t.jsx)("p",{className:"mx-auto mt-4 max-w-[600px] text-lg opacity-90",children:e("subtitle")}),(0,t.jsx)(s.motion.div,{whileHover:l?{}:{scale:1.02},whileTap:l?{}:{scale:.98},className:"mt-8 inline-block",children:(0,t.jsx)(n.Link,{href:"/portfolio",className:"inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-primary shadow-md",children:e("button")})})]})})})}])}]);