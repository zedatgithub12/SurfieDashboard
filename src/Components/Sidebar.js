import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as BsIcons from "react-icons/bs";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
 import logo from '../assets/LogoMedium.png';

const Nav = styled.div`
  background: #10a698;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
 
`;
 
const NavIcon = styled(Link)`
  margin-left: 0.7rem;
  font-size: 2rem;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
 
const SidebarNav = styled.nav`
  background: #15171c;
  width: 220px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 70;
  padding-top: 20px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
 
const SidebarWrap = styled.div`
  width: 96%;
`;
 
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
 
  const showSidebar = () => setSidebar(!sidebar);
 
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav className="sticky-top">
          <NavIcon to="#">
            <BsIcons.BsList onClick={showSidebar} />
            <img src ={logo} alt="logo" width="120" height="120"  />
          </NavIcon>
         {/* <div >
            <img src ={logo} alt="logo" width="120" height="120"  />
         </div> */}
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {/* <NavIcon to="#">
               <BsIcons.BsList onClick={showSidebar} />
              <img src ={logo} alt="logo" width="120" height="120"  />
            </NavIcon> */}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};
 
export default Sidebar;