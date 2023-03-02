import { useState } from 'react';
import Form from './Form';

function Category(props) {
  const { category, todo } = props;
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div className="category">
        <div></div>
        <p>{category}</p>
        <p onClick={() => {setIsAdd(true)}}>+</p>
        <p>{todo}</p>
        {isAdd ? <Form></Form> : null}
    </div>
  );
}

export default Category;
