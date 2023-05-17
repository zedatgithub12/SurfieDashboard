import React from "react";
import * as RiIcons from "react-icons/ri";

import {
  IconDashboard,
  IconUsersGroup,
  IconUsers,
  IconUserBolt,
  IconMailOpened,
  IconLifebuoy,
  IconTimelineEventExclamation,
  IconJumpRope,
} from "@tabler/icons-react";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <IconDashboard size={22} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <IconUsersGroup size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Expired",
        path: "/expired",
        icon: <IconTimelineEventExclamation size={18} />,
        cName: "sub-nav",
      },
      {
        title: "Trials",
        path: "/emails",
        icon: <IconJumpRope size={18} />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Partners",
    path: "/partners",
    icon: <IconUserBolt size={22} />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Manage Users",
    path: "/users",
    icon: <IconUsers size={22} />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  // {
  //   title: "Notifications",
  //   path: "/notifications",
  //   icon: <IoIcons.IoMdNotificationsOutline />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },

  {
    title: "Emails",
    path: "/emails",
    icon: <IconMailOpened size={20} />,
  },
  {
    title: "Supports",
    path: "/support",
    icon: <IconLifebuoy size={20} />,
  },
];
