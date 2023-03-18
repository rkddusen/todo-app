// import { useState, useEffect, useRef } from 'react';

// function Form(props) {
//   const { setIsAdd } = props;
//   const divRef = useRef(null);

//   useEffect(() => {
//     if(divRef.current !== null){
//       divRef.current.focus();
//     }
//   },[]);

//   return (
//     <div className="form">
//         <input type='text' ref={divRef} placeholder='할 일을 추가하세요!' onBlur={() => {setIsAdd(false)}}></input>
//         <p>추가</p>
//     </div>
//   );
// }

// export default Form;

// import { useEffect, useRef, useState } from 'react';

// function Form(props) {
//   const { setIsAdd, isAdd } = props;
//   const [value, setValue] = useState('');
//   const divRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//       console.log('클릭')
//     // div 영역 외를 클릭했을 때
//     function handleClickOutside(e) {
//       const isInside = divRef?.current?.contains(e.target);
//       if (divRef.current && !isInside) {
//         if(inputRef.current.value){
//           setValue(inputRef.current.value)
//         } else {
//           setIsAdd(false);
//         }

//       }
//     }
//     if(divRef){
//     isAdd && setTimeout(() => {document.addEventListener("click", handleClickOutside)}, 0);
//     isAdd && inputRef.current.focus();
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }
//   }, [divRef]);

//   useEffect(()=>{
//     if(value){
//       props.onWrite(value);
//       setIsAdd(false);
//     }
//   },[value])

//   return (
//     <div className="form" ref={divRef}>
//         <input type='text' placeholder='할 일을 추가하세요!' ref={inputRef}></input>
//     </div>
//   );
// }

// export default Form;

import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../ThemeContext';

function Form(props) {
  const { type, setForm, onWrite, data } = props;
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

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
    <StyledForm>
        <FormInput
          theme={theme}
          type='text'
          ref={inputRef}
          onKeyUp={() => {
            if(window.event.keyCode === 13) setValue(inputRef.current.value);
          }}
          placeholder={type === 2 ? null : "할 일을 입력하세요!"}
          defaultValue={type === 2 ? data : null}></FormInput>
        <FormBtn
          color={theme.color}
          type='button'
          onClick={()=>{
            setValue(inputRef.current.value);
          }}>{type === 2 ? '변경' : '추가' }</FormBtn>
    </StyledForm>
  );
}

const StyledForm = styled.div`
  width: 100%;
  display: flex;
  align-items: bottom;
`;
const FormInput = styled.input`
  width: calc(100% - 85px);
  border: none;
  box-sizing: border-box;
  border-bottom: 2px solid ${props => props.theme.color};
  font-size: 16px;
  padding: 10px;
  background: none;
  color: ${props => props.theme.color};
  &::placeholder{
    color: ${props => props.theme.placeholder};
  }
`;
const FormBtn = styled.button`
  width: 80px;
  font-size: 16px;
  margin-left: 5px;
  padding: 5px;
  background: none;
  border-radius: 30px;
  border: none;
  /* border: 2px solid ${props => props.color}; */
  color: #424242;
  background-color: #f0f0f0;
  &:hover{
    cursor: pointer;
    font-weight: bold;
  }
`;

export default Form;
