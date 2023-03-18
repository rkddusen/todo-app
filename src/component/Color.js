import styled from 'styled-components';

function Color(props){
  const { color, check, onChangeColor } = props;
  return(
    <Circle color={color} check={check} onClick={()=>{onChangeColor(color)}}></Circle>
  );
}

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid ${props => props.check ? 'black' : '#00000000'};
  margin: 5px 10px;

  &:hover{
    cursor: pointer;
  }
`;

export default Color;
