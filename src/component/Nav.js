import { useState } from "react";
import Setting from "./Setting";
import styled from 'styled-components';

function Nav(props) {
  const { category, setCategory,  todo, setTodo, color, setColor } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledNav>
      <NavTitle>TODOoO</NavTitle>
      <NavSetting
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></StyledSvg>
      </NavSetting>
      {
        isOpen ? 
        <Setting
          category={category}
          setCategory={setCategory}
          todo={todo}
          setTodo={setTodo}
          setIsOpen={setIsOpen}
          color={color}
          setColor={setColor}
        ></Setting>
        :
        null
      }
    </StyledNav>
  );
}

const StyledSvg = styled.svg`
  &:hover{
    stroke: #000000;
  }
`;
const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const NavTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
`;
const NavSetting = styled.p`
  font-size: 30px;
  &:hover{
    cursor: pointer;
  }
`;

export default Nav;
