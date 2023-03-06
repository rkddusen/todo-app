import { useState, useEffect } from 'react';
import Form from './Form';

function Category(props) {
  const { category, todo, onCreate, onUpdate, isOpen, setIsOpen } = props;
  const [isAdd, setIsAdd] = useState(false);
  const [todoForm, setTodoForm] = useState([]);
  const [isUpdate, setIsUpdate] = useState(-1);

  useEffect(()=>{
    if(isOpen !== '' && isOpen !== category && isAdd) setIsAdd(false);
  },[isOpen]);

  useEffect(()=>{
    isAdd && setIsOpen(category);
  }, [isAdd]);

  useEffect(()=>{
    let _form = [];
    for(let i = 0; i < todo.length; i++){
      _form.push(
        <div key={i}>
              <p>{todo[i].desc}</p>
              { isUpdate === i ? 
                <p onClick={()=>{setIsUpdate(-1)}}>×</p> 
                :
                <p onClick={()=>{setIsUpdate(i)}}>✎</p>
              }
              <p>🗑</p>
          { isUpdate === i ? 
            <Form
              type={2}
              setForm={setIsUpdate}
              onWrite={(data)=>{
                onUpdate(todo[i].id, data);
              }}
              data={todo[i].desc}></Form>
            :
            null
          }
        </div>
      )
    }
    setTodoForm(_form);
  },[todo, isUpdate])

  return (
    <div className="category">
        <div></div>
        <p>{category}</p>
        <p onClick={() => {setIsAdd(!isAdd)}}>{ isAdd ? '×' : '+' }</p>
        <div>{todoForm}</div>
        {isAdd ? <Form type={1} setForm={setIsAdd} onWrite={(data)=>{onCreate(data)}} data={null}></Form> : null}
    </div>
  );
}

export default Category;
