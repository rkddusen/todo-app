import './App.css';
import Nav from './component/Nav';
import Category from './component/Category';
import { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState([{
    id:0,
    category:'일반',
    desc:'할일1'
  },{
    id:1,
    category:'일반',
    desc:'할일2'
  },{
    id:2,
    category:'카테고리2',
    desc:'할일1'
  }]);
  const [category, setCategory] = useState(['일반','카테고리2']);
  const [cateForm, setCateForm] = useState([]);
  const [isOpen, setIsOpen] = useState('');

  useEffect(()=>{
    let _cateform = [];
    for(let i = 0; i < category.length; i++){
      let _todo = [];
      for(let j = 0; j < todo.length; j++){
        if(category[i] === todo[j].category){
          _todo.push({id:todo[j].id, desc:todo[j].desc});
        }
      }
      _cateform.push(
        <Category
          key={i}
          category={category[i]}
          todo={_todo}
          onCreate={(data) => {
            let _id = todo[todo.length - 1].id;
            setTodo([...todo, {
              id:_id + 1,
              category: category[i],
              desc: data
            }]);
          }}
          onUpdate={(id, data)=>{
            let changeTodo = Array.from(todo);
            for(let i = 0; i < todo.length; i++){
              if(changeTodo[i].id === id){
                changeTodo[i].desc = data;
                break;
              }
            }
            setTodo(changeTodo);
          }}
          onDelete={(id)=>{
            let changeTodo = Array.from(todo);
            for(let i = 0; i < todo.length; i++){
              if(changeTodo[i].id === id){
                changeTodo.splice(i,1);
                break;
              }
            }
            setTodo(changeTodo);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ></Category>
      );
    }
    setCateForm(_cateform);
  },[category, todo, isOpen])

  return (
    <div className="app">
      <Nav
        category={category}
        setCategory={setCategory}
        todo={todo}
        setTodo={setTodo}
      ></Nav>
      {cateForm}
    </div>
  );
}

export default App;
