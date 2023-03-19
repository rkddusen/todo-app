import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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
    <StyledForm>
        <FormInput
          type='text'
          ref={inputRef}
          onKeyUp={() => {
            if(window.event.keyCode === 13) setValue(inputRef.current.value);
          }}
          placeholder={type === 2 ? null : "할 일을 입력하세요!"}
          defaultValue={type === 2 ? data : null}></FormInput>
        <FormBtn
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
  color: #424242;
  background-color: #f0f0f0;
  &:hover{
    cursor: pointer;
    font-weight: bold;
  }
`;

export default Form;
