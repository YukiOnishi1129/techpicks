import { graphql } from "gql.tada";

export const UpdateMyFeedFolderMutation = graphql(`
  mutation UpdateMyFeedFolderMutation($input: UpdateMyFeedFolderInput!) {
    updateMyFeedFolder(updateMyFeedFolderInput: $input) {
      id
      title
      description
      feeds {
        id
        name
        description
        siteUrl
        thumbnailUrl
        platform {
          id
          name
          siteUrl
          platformSiteType
          faviconUrl
          isEng
        }
      }
    }
  }
`);
