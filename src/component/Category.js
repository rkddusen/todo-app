import { useState, useEffect } from 'react';
import Form from './Form';

function Category(props) {
  const { category, todo, onWrite, isOpen, setIsOpen } = props;
  const [isAdd, setIsAdd] = useState(false);

  useEffect(()=>{
    if(isOpen !== '' && isOpen !== category && isAdd) setIsAdd(false);
  },[isOpen]);

  useEffect(()=>{
    isAdd && setIsOpen(category);
  }, [isAdd]);
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
