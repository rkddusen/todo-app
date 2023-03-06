import { useState, useEffect, useRef } from 'react';

function Form(props) {
  const { type, setForm, onWrite, data } = props;
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(()=>{
    if(value){
      if(type === 1){
        onWrite(value);
        setValue('');
        setForm(false);
      }
      else {
        onWrite(value);
        setValue('');
        setForm(-1);
      }
    }
  },[value])


  return (
    <div className="form">
        <input
          type='text'
          ref={inputRef}
          onKeyUp={() => {
            if(window.event.keyCode === 13) setValue(inputRef.current.value);
          }}
          placeholder={type === 2 ? null : "할 일을 입력하세요!"}
          defaultValue={type === 2 ? data : null}></input>
        <button
          type='button'
          onClick={()=>{
            setValue(inputRef.current.value);
          }}>{type === 2 ? '변경' : '추가' }</button>
    </div>
  );
}

export default Form;
