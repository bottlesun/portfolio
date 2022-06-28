import React, { memo } from 'react';

const Try = memo(({tryInfo}) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});
Try.displayName = 'Try';
// 메모를 쓰게되면 이름이 이상하게 바뀌기 때문에 displayName 설정을 꼭 해줘야 한다.
export default Try;
