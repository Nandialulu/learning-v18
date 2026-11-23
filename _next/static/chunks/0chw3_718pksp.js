(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,50456,(e,t,a)=>{t.exports={types:{flashcards:"5s1Y8Q1iRG-O2nBdQ0cO3",quizzes:"zPG2a3aamol7iHD-iIJz8"},categories:{"finance-basics:mn":"5xVDoq5Yd7KKXSTmrUSmt","economics:mn":"aSfs7uEd1EYTKJh5f7xkv","finance-management:mn":"uo5XhQ-e7CoZSyEE_UjYC","investment-management:mn":"3wPwp3Ee0qrjnGweyyQPq","corporate-finance:mn":"cBQVt3i3su6LXh68MbyDw","bank-management:mn":"eM7dVwjiXOviKLUNA4Dbl","bank-accounting:mn":"MDPKeEJIfoo-zQM5d8lSg","finance-basics:en":"57mcEXYTDkkEVq8CVdPVY","economics:en":"HeAw55JeWZ88B1f2-jZA1","finance-management:en":"8zIUkfZGzR3MCxeo4mpdh","investment-management:en":"-pNB-cBO4eyNOCrDGq99r","corporate-finance:en":"eyeq1CS8cMrz2RjPgeRfq","bank-management:en":"0HQDSbc6-WKtUgCGiysyg","bank-accounting:en":"_ED7daWypHT6LvNBTgeTi","finance-basics:ko":"lf2iy7mTCZk2ZYpNk1rQ9","economics:ko":"r8phvuQpiZqUNRHr-GrxG","finance-management:ko":"dVxmSXklZyf-NrKZ-ZQWd","investment-management:ko":"qEy9Ab_fh9dWi4Q5XdLe4","corporate-finance:ko":"LHM9nHJidAdWKOLD_CP7D","bank-management:ko":"dXuCsgWw0aE5_igIVk9Ot","bank-accounting:ko":"IU5CJ3CzxgHWEts-JwS0g","finance-basics:ja":"GzMPyTZsOUd13ekmYAlBy","economics:ja":"ooF03__034NL-yeIw62I8","finance-management:ja":"n4sey5rnSB68OyXnCBwQO","investment-management:ja":"2CdOiDoRYdcY58yAWXGoB","corporate-finance:ja":"TnQFQi0azZd5380lLcM1S","bank-management:ja":"PSkLSSk5JHaGulZVmVmDy","bank-accounting:ja":"JLmFsXD6W-Dd4VkLMxqIF"},version:1,typeCodes:{flashcards:"flashcards_2",quizzes:"quizzes"}}},20959,e=>{"use strict";var t=e.i(91583);let a=t.gql`
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
  ${a}
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
  ${a}
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
`;let n=t.gql`
  ${a}
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
  ${a}
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
`;var i=e.i(50456);function s(e,t,a){let n=i.default.categories[`${t}:${a}`];if(!n)throw Error(`Unknown learning category: ${t}:${a}`);return{type:i.default.typeCodes[e],categoryIds:[n],status:"published",sortField:"_id",sortDirection:"asc"}}async function r(e,t,a,i){let r,o=[],d=new Set;for(;;){let{data:g}=await e.query({query:n,variables:{...s(t,a,i),limit:100,cursor:r},fetchPolicy:"no-cache"}),c=g?.cpPostList;if(!c)throw Error("CMS returned no learning response");if(o.push(...c.posts),!c.pageInfo?.hasNextPage)break;let l=c.pageInfo.endCursor;if(!l||d.has(l)||!c.posts.length)throw Error("CMS pagination did not advance");d.add(l),r=l}if(new Set(o.map(e=>e._id)).size!==o.length)throw Error("CMS returned duplicate questions");return o}async function o(e,t,a,i){let{data:r}=await e.query({query:n,variables:{...s(t,a,i),limit:1},fetchPolicy:"no-cache"});if("number"!=typeof r?.cpPostList?.totalCount)throw Error("CMS count missing");return r.cpPostList.totalCount}e.s(["fetchLearningCount",0,o,"fetchLearningPosts",0,r],20959)}]);