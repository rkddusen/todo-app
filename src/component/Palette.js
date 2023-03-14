import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from './Color';

function Palette(props){
  const { onChangeColor, nowColor } = props;
  const [colorForm, setColorForm] = useState([]);
  const [color, setColor] = useState([
    '#ffc4c4', '#ffd9c4', '#fff8c4', '#e7ffc4', '#ccffc4', '#c4ffed', '#c4f5ff', '#c4dbff', '#c8c4ff', '#e0c4ff', '#fcc4ff', '#dedede'
  ])

  useEffect(()=>{
    let _colorForm = [];
    for(let i = 0; i < color.length; i++){
      if(nowColor === color[i]){
        _colorForm.push(
        <Color key={i} color={color[i]} check={true} onChangeColor={onChangeColor}></Color>
        );
      } else{
        _colorForm.push(
        <Color key={i} color={color[i]} check={false} onChangeColor={onChangeColor}></Color>
        );
      }
    }
    setColorForm(_colorForm)
  },[nowColor])
  return(
    <StyledPalette>
      {colorForm}
      {/* <Color color=''></Color> */}
    </StyledPalette>
  );
}

const StyledPalette = styled.div`
  width: 220px;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Palette;
