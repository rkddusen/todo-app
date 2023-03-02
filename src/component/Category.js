import { useState } from 'react';
import Form from './Form';

function Category(props) {
  const { category, todo, onWrite } = props;
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div className="category">
        <div></div>
        <p>{category}</p>
        <p onClick={() => {setIsAdd(!isAdd)}}>{ isAdd ? '×' : '+' }</p>
        <p>{todo}</p>
        {isAdd ? <Form setIsAdd={setIsAdd} onWrite={(data)=>{onWrite(data)}}></Form> : null}
    </div>
  );
}

export default Category;
