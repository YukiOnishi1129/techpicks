import { graphql } from "gql.tada";

import { DeskTopSidebarFragment } from "../../Sidebar/DesktopSidebar/DesktopSidebarFragment";

export const LoggedBaseLayoutFragment = graphql(
  `
    fragment LoggedBaseLayoutFragment on Query {
      ...DeskTopSidebarFragment
    }
  `,
  [DeskTopSidebarFragment]
);
