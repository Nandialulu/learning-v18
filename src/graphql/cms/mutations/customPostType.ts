import { gql } from "@apollo/client";
import type { CustomPostType } from "../queries/customPostType";

export type CustomPostTypeInput = {
  label: string;
  pluralLabel: string;
  code: string;
  description?: string;
  clientPortalId?: string;
};

export const CP_CMS_CUSTOM_POST_TYPES_ADD = gql`
  mutation CpCmsCustomPostTypesAdd($input: CustomPostTypeInput!) {
    cpCmsCustomPostTypesAdd(input: $input) {
      _id
      clientPortalId
      code
      label
      pluralLabel
      description
      createdAt
    }
  }
`;

export type CpCmsCustomPostTypesAddVariables = {
  input: CustomPostTypeInput;
};

export type CpCmsCustomPostTypesAddData = {
  cpCmsCustomPostTypesAdd: CustomPostType;
};

export const CP_CMS_CUSTOM_FIELD_GROUPS_ADD = gql`
  mutation CpCmsCustomFieldGroupsAdd($input: CustomFieldGroupInput!) {
    cpCmsCustomFieldGroupsAdd(input: $input) {
      _id
      code
      fields
    }
  }
`;
