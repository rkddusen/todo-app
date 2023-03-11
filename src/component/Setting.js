import { useEffect, useState } from "react";
import styled from "styled-components";

function Setting(props) {
  const { category, setCategory, todo, setTodo } = props;
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    let _allCategory = [];
    for (let i = 0; i < category.length; i++) {
      _allCategory.push(
        <CategoryLi key={i}>
          <Category>{category[i]}</Category>
          <span onClick={() => DeleteCategory(i)}>×</span>
        </CategoryLi>
      );
    }
    _allCategory.push(
      <CategoryLi key={-1}>
        <span onClick={PlusCategory}>+</span>
      </CategoryLi>
    );
    setAllCategory(_allCategory);
  }, [category, todo]);

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
            break;
          }
          else break;
        }
      } else {
        setCategory([...category, _new]);
      }
    }
  }
  function DeleteCategory(index){
    if(window.confirm('해당 카테고리 내의 활동이 삭제됩니다.\n삭제하시겠습니까?')){
      let _category = Array.from(category);
      let trash = _category.splice(index,1);
      setCategory(_category);

      let _todo = Array.from(todo);
      for(let i = todo.length - 1; i >= 0; i--){
        if(_todo[i].category === trash[0]){
          _todo.splice(i,1);
        }
      }
      setTodo(_todo);
    }
  }

  return (
    <StyledSetting>
      <SettingArea>
          <CategoryTitle>카테고리</CategoryTitle>
          <CategoryUl>{allCategory}</CategoryUl>
      </SettingArea>
    </StyledSetting>
  );
}

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
  background-color: white;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px;
`;
const CategoryTitle = styled.div`
  font-size: 23px;
  font-weight: bold;
  padding-bottom: 20px;
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
  border-bottom: 1px solid black;
`;


export default Setting;
