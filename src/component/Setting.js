import { useEffect, useState } from "react";

function Setting(props) {
  const { category, setCategory } = props;
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    let _allCategory = [];
    for (let i = 0; i < category.length; i++) {
      _allCategory.push(
        <div key={i}>
          <span>{category[i]}</span>
          <span>×</span>
        </div>
      );
    }
    if (category.length <= 5) {
      _allCategory.push(
        <div>
          <span onClick={PlusCategory}>+</span>
        </div>
      );
    }
    setAllCategory(_allCategory);
  }, [category]);

  function PlusCategory() {
    let str = "추가할 카테고리 명을 입력해주세요!";
    let _new = window.prompt(str);
    if (_new !== null) { // null이 아니라면
      if (category.indexOf(_new) !== -1 || _new === '') {
        while(true){
          if(category.indexOf(_new) !== -1) {
            _new = window.prompt("중복입니다.\n추가할 카테고리 명을 입력해주세요!");
            continue;
          }
          else if(_new === '') {
            _new = window.prompt("추가할 카테고리 명을 입력해주세요!");
            continue;
          }
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
