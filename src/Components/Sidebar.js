import React, {  useState } from "react";
import styled from "styled-components";
import {useNavigate } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import logo from "../assets/LogoMedium.png";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle } from "react-icons/fa";
import {  Row } from "react-bootstrap";
import { AuthContext } from "./Context";

const Nav = styled.div`
  background: #00c6d4;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;



const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
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
  const { SignOut } = React.useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const Logout = () => {
    SignOut();
    navigate("/");
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav className="sticky-top">
          <span onClick={showSidebar} className="ps-4">
            <BsIcons.BsList onClick={showSidebar} size={24} />
            <img src={logo} alt="logo" width="120" height="120" />
          </span>

          <div className="position-absolute end-0 me-4">
            <Dropdown className="text-center">
              <Dropdown.Toggle
                variant="white"
                title="Profile"
                id="dropdown-basic"
                className="border-0 primary-bg  text-white fw-medium font-link rounded-circle text-center"
              >
                <FaUserCircle size={26} color="#fff" />
              </Dropdown.Toggle>

              <Dropdown.Menu variant="light">
                <Row className="p-3 pt-0 pb-0">
                  <span className="fw-semibold fs-5">{user.name}</span>

                  <span className="fw-light fs-6 m-0">Super Admin</span>
                  <span>{user.email}</span>
                </Row>
                <hr />
                <Dropdown.Item onClick={() => navigate("/changepassword")}>
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => Logout()}
                  className="text-primary"
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
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
