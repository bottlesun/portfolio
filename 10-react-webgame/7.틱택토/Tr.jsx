import React, {memo,useMemo} from 'react'
import Td from './Td'

const Tr = memo(({rowData, rowIndex, dispatch}) => {
  console.log('Tr rendered');
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        useMemo(() => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
          , [rowData[i]])
        ))}
    </tr>
  );
})
Tr.displayName = 'tr';
export default Tr;