import { useState, useEffect, useRef } from 'react';

function Form(props) {
  const { setIsAdd, onWrite } = props;
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(()=>{
    if(value){
      onWrite(value);
      setValue('');
      setIsAdd(false);
    }
  },[value])

  return (
    <div className="form">
        <input
          type='text'
          ref={inputRef}
          onKeyUp={() => {
            if(window.event.keyCode === 13) setValue(inputRef.current.value);
          }}></input>
        <button
          type='button'
          onClick={()=>{
            setValue(inputRef.current.value);
          }}>추가</button>
    </div>
  );
}

export default Form;
