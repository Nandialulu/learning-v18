import { gql } from "@apollo/client";

export type CategoryStatus = "active" | "inactive";

export type PageInfo = {
  endCursor?: string;
  hasNextPage?: boolean;
};

export type PostCategory = {
  _id: string;
  clientPortalId: string;
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  status?: CategoryStatus;
  parent?: PostCategory;
  customFieldsData?: Record<string, unknown>;
  customFieldsMap?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

export type PostCategoryListResponse = {
  list: PostCategory[];
  totalCount: number;
  pageInfo: PageInfo;
};

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on PostCategory {
    _id
    clientPortalId
    name
    slug
    description
    parentId
    status
    parent {
      _id
      name
      slug
    }
    customFieldsData
    createdAt
    updatedAt
  }
`;

export const CP_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  query CpCategories($clientPortalId: String, $language: String, $limit: Int, $cursor: String) {
    cpCategories(clientPortalId: $clientPortalId, language: $language, limit: $limit, cursor: $cursor) {
      list {
        ...CategoryFields
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export type CpCategoriesVariables = {
  limit?: number;
  cursor?: string;
  clientPortalId?: string;
  language?: string;
};

export type CpCategoriesData = {
  cpCategories: PostCategoryListResponse;
};
