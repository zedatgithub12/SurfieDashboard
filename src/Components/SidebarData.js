import React from "react";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <RxDashboard size={22} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    //  subNav: [
    //   {
    //     title: "Emails",
    //     path: "/emails",
    //     icon: <HiOutlineMail size={18}/>,
    //     cName: "sub-nav",
    //   },
    // ],
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <FiIcons.FiUsers size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    //  subNav: [
    //   {
    //     title: "Emails",
    //     path: "/emails",
    //     icon: <HiOutlineMail size={18}/>,
    //     cName: "sub-nav",
    //   },
    // ],
  },
  {
    title: "Partners",
    path: "/partners",
    icon: <FiIcons.FiUser size={20} />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Manage Users",
    path: "/users",
    icon: <FiIcons.FiUser size={20} />,

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
    icon: <HiOutlineMail size={18} />,
  },
  {
    title: "Supports",
    path: "/support",
    icon: <BiIcons.BiSupport size={20} />,
  },
];
