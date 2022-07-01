import React, {memo, useCallback, useEffect, useRef} from 'react'
import {CLICK_CELL} from "./TicTacToe";

const Td = memo(({rowIndex, cellIndex, cellData, dispatch}) => {
  console.log('Td rendered');

/*  const ref = useRef([]);
  useEffect(() => { // 성능 최적화 할때 사용 하는 방법
    console.log(rowIndex === ref.current[0],cellIndex === ref.current[1],cellData === ref.current[3],dispatch === ref.current[4]); // false가 나오면 리렌더링이 발생

    ref.current = [rowIndex, cellIndex, cellData, dispatch];
  }, [rowIndex, cellIndex, cellData, dispatch])*/

  const onClickTd = useCallback(() => { // props로 넣어두는 데이터는 useCallback에 넣어주는게 좋다.
    console.log(rowIndex, cellIndex);
    if (cellData) return;
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
});
Td.displayName = 'td';
export default Td;