import "./App.css";
import Nav from "./component/Nav";
import Category from "./component/Category";
import { useEffect, useState, useMemo } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme, darkTheme } from "./theme/theme";
import { useTheme } from "./hooks/useTheme";
import ThemeContext from "./ThemeContext";

function App() {
  const [todo, setTodo] = useState([
    {
      id: 0,
      category: "일반",
      desc: "할일1",
      done: true,
    },
    {
      id: 1,
      category: "일반",
      desc: "할일2",
      done: false,
    },
    {
      id: 2,
      category: "카테고리2",
      desc: "할일1",
      done: false,
    },
  ]);
  const [category, setCategory] = useState(["일반", "카테고리2"]);
  const [color, setColor] = useState(["#ffc4c4", "#ffd9c4"]);
  const [cateForm, setCateForm] = useState([]);
  const [isOpen, setIsOpen] = useState("");

  const [themeMode, setThemeMode] = useTheme();
  const theme = useMemo(() => {
    return themeMode === "light" ? lightTheme : darkTheme;
  }, [themeMode]);

  useEffect(() => {
    let _cateform = [];
    for (let i = 0; i < category.length; i++) {
      let _todo = [];
      for (let j = 0; j < todo.length; j++) {
        if (category[i] === todo[j].category) {
          _todo.push({
            id: todo[j].id,
            desc: todo[j].desc,
            done: todo[j].done,
          });
        }
      }
      _cateform.push(
        <Category
          key={i}
          category={category[i]}
          color={color[i]}
          todo={_todo}
          onCreate={(data) => {
            let _id = 0;
            if (todo.length >= 1) _id = todo[todo.length - 1].id + 1;
            setTodo([
              ...todo,
              {
                id: _id,
                category: category[i],
                desc: data,
                done: false,
              },
            ]);
          }}
          onUpdate={(id, data) => {
            let changeTodo = Array.from(todo);
            for (let i = 0; i < todo.length; i++) {
              if (changeTodo[i].id === id) {
                changeTodo[i].desc = data;
                break;
              }
            }
            setTodo(changeTodo);
          }}
          onDelete={(id) => {
            let changeTodo = Array.from(todo);
            for (let i = 0; i < todo.length; i++) {
              if (changeTodo[i].id === id) {
                changeTodo.splice(i, 1);
                break;
              }
            }
            setTodo(changeTodo);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onDone={(id) => {
            let changeTodo = Array.from(todo);
            for (let i = 0; i < todo.length; i++) {
              if (changeTodo[i].id === id) {
                changeTodo[i].done = !changeTodo[i].done;
                break;
              }
            }
            setTodo(changeTodo);
          }}
        ></Category>
      );
    }
    setCateForm(_cateform);
  }, [category, todo, isOpen, color]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledApp>
          <Padding>
            <TodoBox>
              <Nav
                category={category}
                setCategory={setCategory}
                todo={todo}
                setTodo={setTodo}
                color={color}
                setColor={setColor}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
              ></Nav>
              {cateForm}
            </TodoBox>
          </Padding>
        </StyledApp>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.color};
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    cursor: default;
  }
`;

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Padding = styled.div`
  margin: 0 auto;
  padding: 20px;
`;
const TodoBox = styled.div`
  width: 460px;
  min-width: 460px;
  height: 510px;
  min-height: 510px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.areaColor};

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
