import type { ApolloClient } from "@apollo/client";
import { CP_POST_LIST, type CpPostListData, type Post } from "@/graphql/cms/queries/post";
import manifest from "@/data/learning-cms.json";
import type { LearningKind } from "./learning-content";

export function learningVariables(kind: LearningKind, subject: string, locale: string) {
  const category = (manifest.categories as Record<string, string>)[`${subject}:${locale}`];
  if (!category) throw new Error(`Unknown learning category: ${subject}:${locale}`);
  return { type: manifest.typeCodes[kind], categoryIds: [category], status: "published", sortField: "_id", sortDirection: "asc" };
}

export async function fetchLearningPosts(client: ApolloClient, kind: LearningKind, subject: string, locale: string) {
  const posts: Post[] = [];
  const cursors = new Set<string>();
  let cursor: string | undefined;
  for (;;) {
    const { data } = await client.query<CpPostListData>({
      query: CP_POST_LIST, variables: { ...learningVariables(kind, subject, locale), limit: 100, cursor }, fetchPolicy: "no-cache",
    });
    const list = data?.cpPostList;
    if (!list) throw new Error("CMS returned no learning response");
    posts.push(...list.posts);
    if (!list.pageInfo?.hasNextPage) break;
    const next = list.pageInfo.endCursor;
    if (!next || cursors.has(next) || !list.posts.length) throw new Error("CMS pagination did not advance");
    cursors.add(next);
    cursor = next;
  }
  if (new Set(posts.map(post => post._id)).size !== posts.length) throw new Error("CMS returned duplicate questions");
  return posts;
}

export async function fetchLearningCount(client: ApolloClient, kind: LearningKind, subject: string, locale: string) {
  const { data } = await client.query<CpPostListData>({ query: CP_POST_LIST, variables: { ...learningVariables(kind, subject, locale), limit: 1 }, fetchPolicy: "no-cache" });
  if (typeof data?.cpPostList?.totalCount !== "number") throw new Error("CMS count missing");
  return data.cpPostList.totalCount;
}
