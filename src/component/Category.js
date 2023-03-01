import Form from './Form';

function Category(props) {
  return (
    <div className="category">
        <div></div>
        <p>{props.category}</p>
        <p>+</p>
        <p>{props.todo}</p>
    </div>
  );
}

export default Category;
