import { useState, useContext } from "react";
import Setting from "./Setting";
import styled from 'styled-components';
import ThemeContext from '../ThemeContext';

function Nav(props) {
  const { category, setCategory,  todo, setTodo, color, setColor, themeMode, setThemeMode } = props;
  const [isOpen, setIsOpen] = useState(false);
  const theme = useContext(ThemeContext);

  return (
    <StyledNav>
      <NavTitle>TODOoO</NavTitle>
      <NavSetting>
        <StyledToggle
          back={themeMode === 'light' ? 'white' : '#2a2a2a'}
          onClick={() => {
            setThemeMode(themeMode === 'light' ? 'dark' : 'light');
            window.localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light')
          }}
        >
          <ToggleSun><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cursor='pointer'><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg></ToggleSun>
          <ToggleMoon><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cursor='pointer'><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></ToggleMoon>
        </StyledToggle>
        <StyledSvg onClick={() => {setIsOpen(true);}} svgHover={theme.svgHover} stroke={theme.color} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></StyledSvg>
      </NavSetting>
      {isOpen ? <Setting category={category} setCategory={setCategory} todo={todo} setTodo={setTodo} setIsOpen={setIsOpen} color={color} setColor={setColor}></Setting> : null}
    </StyledNav>
  );
}

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const NavTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
`;
const NavSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;
const StyledToggle = styled.div`
  width: 50px;
  height: 22px;
  border-radius: 20px;
  background-color: ${props => props.back};
  position: relative;
  margin-right: 10px;
  border: 2px solid #2a2a2a;
  transition:background-color 0.3s;
    cursor: pointer;
`;
const ToggleSun = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  left: 2px;
  top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
    cursor: pointer;
`;
const ToggleMoon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  right: 2px;
  top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
    cursor: pointer;
  
`;
const StyledSvg = styled.svg`
  font-size: 30px;
  &:hover{
    stroke: ${props => props.svgHover};
    cursor: pointer;
  }
`;

export default Nav;
