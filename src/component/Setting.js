import { useEffect, useState } from "react";

function Setting(props) {
  const { category, setCategory, todo, setTodo } = props;
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    let _allCategory = [];
    for (let i = 0; i < category.length; i++) {
      _allCategory.push(
        <div key={i}>
          <span>{category[i]}</span>
          <span onClick={() => DeleteCategory(i)}>×</span>
        </div>
      );
    }
    _allCategory.push(
      <div key={-1}>
        <span onClick={PlusCategory}>+</span>
      </div>
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
    <div className="setting">
      <div className="setting-area">
        <div>
          <p>카테고리</p>
          <div>{allCategory}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Setting;
