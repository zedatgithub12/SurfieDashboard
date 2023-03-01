import React from "react";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

export const SidebarData = [
  {
    title: "Customers",
    path: "/customers",
    icon: <FiIcons.FiUsers/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     subNav: [
      {
        title: "Emails",
        path: "/emails",
        icon: <HiOutlineMail/>,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Manage Users",
    path: "/users",
    icon: <FiIcons.FiUser/>,
 
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <IoIcons.IoMdNotificationsOutline />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: "Supports",
    path: "/support",
    icon: <BiIcons.BiSupport />,
  },
];