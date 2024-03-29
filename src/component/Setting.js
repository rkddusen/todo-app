import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Palette from './Palette';

function Setting(props) {
  const { category, setCategory, todo, setTodo, setIsOpen, color, setColor } = props;
  const [allCategory, setAllCategory] = useState([]);
  const [formOn, setFormOn] = useState(-1);

  useEffect(() => {
    let _allCategory = [];
    for (let i = 0; i < category.length; i++) {
      _allCategory.push(
        <CategoryLi key={i}>
          <Category
            onClick={()=>{formOn === i ? setFormOn(-1) : setFormOn(i)}}
            check={formOn === i ? true : false}
          >{category[i]}</Category>
          {formOn === i ? 
          <CategoryForm>
            <FormBtn onClick={() => UpdateCategory(i)}>이름 변경</FormBtn>
            <FormBtn onClick={() => DeleteCategory(i)}>삭제</FormBtn>
            <Palette nowColor={color[i]} onChangeColor={(data)=>{
              let _color = Array.from(color);
              _color[i] = data;
              setColor(_color);
            }}></Palette>
          </CategoryForm>
          : null}
        </CategoryLi>
      );
    }
    _allCategory.push(
      <CategoryLi key={-1}>
        <CategoryPlus onClick={PlusCategory}>
        <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></StyledSvg>
        </CategoryPlus>
      </CategoryLi>
    );
    setAllCategory(_allCategory);
  }, [category, todo, formOn, color]);

  function PlusCategory() {
    let str = "추가할 카테고리 명을 입력해주세요!";
    let _new = window.prompt(str);
    if (_new !== null) { // null이 아니라면
      if (category.indexOf(_new) !== -1 || _new === '') {
        while(true){
          if(category.indexOf(_new) !== -1) _new = window.prompt("중복입니다.\n추가할 카테고리 명을 입력해주세요!");
          else if(_new === '') _new = window.prompt("추가할 카테고리 명을 입력해주세요!");
          else if(_new !== null) {
            setCategory([...category, _new]);
            setColor([...color, '#dedede'])
            setFormOn(-1)
            break;
          }
          else break;
        }
      } else {
        setCategory([...category, _new]);
        setColor([...color, '#dedede'])
        setFormOn(-1)
      }
    }
  }
  function DeleteCategory(index){
    if(window.confirm('해당 카테고리 내의 활동이 삭제됩니다.\n삭제하시겠습니까?')){
      let _category = Array.from(category);
      let _color = Array.from(color);
      let trash = _category.splice(index,1);
      _color.splice(index,1);
      setCategory(_category);
      setColor(_color);

      let _todo = Array.from(todo);
      for(let i = todo.length - 1; i >= 0; i--){
        if(_todo[i].category === trash[0]){
          _todo.splice(i,1);
        }
      }
      setTodo(_todo);
      setFormOn(-1)
    }
  }
  function UpdateCategory(index){
    let _category = Array.from(category);
    let _todo = Array.from(todo);
    let _new = window.prompt("변경할 카테고리 명을 입력해주세요!");
    if (_new !== null) { // null이 아니라면
      if (category.indexOf(_new) !== -1 || _new === '') {
        while(true){
          if(category.indexOf(_new) !== -1) _new = window.prompt("중복입니다.\n변경할 카테고리 명을 입력해주세요!");
          else if(_new === '') _new = window.prompt("변경할 카테고리 명을 입력해주세요!");
          else if(_new !== null) {
            _category[index] = _new;
            setCategory(_category);
            for(let i = 0; i < todo.length; i++){
              if(_todo[i].category === category[index]){
                _todo[i].category = _new;
              }
            }
            setTodo(_todo);
            setFormOn(-1)
            break;
          }
          else break;
        }
      } else {
        _category[index] = _new;
            setCategory(_category);
            for(let i = 0; i < todo.length; i++){
              if(_todo[i].category === category[index]){
                _todo[i].category = _new;
              }
            }
            setTodo(_todo);
            setFormOn(-1)
      }
    }
  }

  return (
    <StyledSetting>
      <SettingArea>
        <SettingNav>
          <SettingTitle>카테고리</SettingTitle>
            <StyledSvg onClick={()=>{setIsOpen(false)}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></StyledSvg>
        </SettingNav>
          <CategoryUl>{allCategory}</CategoryUl>
      </SettingArea>
    </StyledSetting>
  );
}

const StyledSvg = styled.svg`
 stroke: ${props => props.theme.color};
  &:hover{
    stroke: ${props => props.theme.svgHover};
    cursor: pointer;
  }
`;
const StyledSetting = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #00000090;
`;
const SettingArea = styled.div`
  width: 300px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: ${props => props.theme.areaColor};
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SettingNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;
const SettingTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
`;
const CategoryUl = styled.div`
  display: flex;
  flex-direction: column;
`;
const CategoryLi = styled.div`
  padding: 10px;
  margin: 5px 0;
  text-align: center;
`;
const Category = styled.span`
  padding-bottom: 2px;
  border-bottom: 1px solid ${props => props.theme.color};
  font-size: 18px;
  font-weight: ${props => props.check ? 600 : "none"};
  &:hover{
    cursor: pointer;
    font-weight: 600;
  }
`;
const CategoryForm = styled.div`
  margin-top: 15px;
`;
const FormBtn = styled.button`
  font-size: 12px;
  padding: 7px 0px;
  width: 80px;
  margin: 0 10px;
  border: none;
  border-radius: 20px;
  color: #424242;
  background-color: #f0f0f0;

  &:hover{
    cursor: pointer;
    font-weight: bold;
  }
`;
const CategoryPlus = styled.span`
  font-size: 25px;
  &:hover{
    cursor: pointer;
    font-weight: 600;
  }
`;


export default Setting;
