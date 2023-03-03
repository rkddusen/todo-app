import './App.css';
import Nav from './component/Nav';
import Category from './component/Category';
import { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState([{
    category:'일반',
    desc:'할일1'
  },{
    category:'일반',
    desc:'할일2'
  },{
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
          _todo.push(todo[j].desc);
        }
      }
      _cateform.push(
        <Category
          key={i}
          category={category[i]}
          todo={_todo}
          onWrite={(data) => {
            setTodo([...todo, {
              category: category[i],
              desc: data
            }]);
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
      <Nav></Nav>
      {cateForm}
    </div>
  );
}

export default App;
