import { useState, useEffect } from "react";
import Form from "./Form";
import styled from "styled-components";

function Category(props) {
  const { category, todo, onCreate, onUpdate, onDelete, isOpen, setIsOpen } =
    props;
  const [isAdd, setIsAdd] = useState(false);
  const [todoForm, setTodoForm] = useState([]);
  const [isUpdate, setIsUpdate] = useState(-1);

  useEffect(() => {
    if (isOpen !== "" && isOpen !== category && (isAdd || isUpdate !== -1)) {
      setIsAdd(false);
      setIsUpdate(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    isAdd && setIsOpen(category);
    isAdd && setIsUpdate(-1);
  }, [isAdd]);

  useEffect(() => {
    isUpdate !== -1 && setIsAdd(false);
    isUpdate !== -1 && setIsOpen(category);
  }, [isUpdate]);

  useEffect(() => {
    let _form = [];
    for (let i = 0; i < todo.length; i++) {
      _form.push(
        <div key={i}>
          <TodoList>
            <TodoLeft>
            <StyledSquare xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></StyledSquare>
              <p>{todo[i].desc}</p>
            </TodoLeft>
            <TodoRight>
              {isUpdate === i ? (
                <IsUpdateDeleteBtn
                  onClick={() => {
                    setIsUpdate(-1);
                  }}
                >
                  <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></StyledSvg>
                </IsUpdateDeleteBtn>
              ) : (
                <IsUpdateDeleteBtn
                  onClick={() => {
                    setIsUpdate(i);
                  }}
                >
                  <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></StyledSvg>
                </IsUpdateDeleteBtn>
              )}
              <IsUpdateDeleteBtn
                onClick={() => {
                  if (
                    window.confirm(
                      "'" + todo[i].desc + "'을(를) 삭제하시겠습니까?"
                    )
                  ) {
                    onDelete(todo[i].id);
                  }
                }}
              >
                <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></StyledSvg>
              </IsUpdateDeleteBtn>
            </TodoRight>
          </TodoList>
          {isUpdate === i ? (
            <Form
              type={2}
              setForm={setIsUpdate}
              onWrite={(data) => {
                onUpdate(todo[i].id, data);
              }}
              data={todo[i].desc}
            ></Form>
          ) : null}
        </div>
      );
    }
    setTodoForm(_form);
  }, [todo, isUpdate]);

  return (
    <StyledCategory>
      <Title>
        <TitleLeft>
        <StyledSquare xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#000000" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></StyledSquare>
          <p>{category}</p>
        </TitleLeft>
        <div>
          <IsAddBtn
            onClick={() => {
              setIsAdd(!isAdd);
            }}
          >
            {isAdd ? 
              <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></StyledSvg> 
              :
              <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></StyledSvg>
            }
          </IsAddBtn>
        </div>
      </Title>
      <div>{todoForm}</div>
      {isAdd ? (
        <Form
          type={1}
          setForm={setIsAdd}
          onWrite={(data) => {
            onCreate(data);
          }}
          data={null}
        ></Form>
      ) : null}
    </StyledCategory>
  );
}


const StyledSvg = styled.svg`
  &:hover{
    stroke: #000000;
  }
`;
const StyledSquare = styled.svg`
  margin-right: 10px;
`;
const StyledCategory = styled.div`
  margin: 10px 0 20px 0;
`;
const Title = styled.div`
  border-bottom: 2px solid #212121;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 23px;
  align-items: center;
`;
const TitleLeft = styled.div`
  display: flex;
  align-items: center;
`;
const ColorBox = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  background-color: #212121;
`;
const IsAddBtn = styled.p`
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const TodoList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  font-size: 18px;
  align-items: center;
  margin: 10px 0;
  background-color: #FBEFEF;
`;
const TodoLeft = styled.div`
  display: flex;
  align-items: center;
`;
const TodoRight = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBox = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  background-color: lightgray;
`;
const IsUpdateDeleteBtn = styled.p`
  margin: 0 5px;
  cursor: pointer;
  &:hover{
    font-weight: bold;
  }
`;


export default Category;
