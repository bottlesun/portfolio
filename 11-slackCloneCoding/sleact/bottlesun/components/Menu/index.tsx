import {CloseModalButton, CreateMenu,} from "@components/Menu/styles";
import React, {CSSProperties, FC, useCallback} from "react";

interface Props {
  style: CSSProperties;
  show: boolean;
  onCloseModal: () => void;
  closeButton?: boolean
}

const Menu: FC<Props> = ({children, style, show, onCloseModal, closeButton}) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
    // stopPropagation() 부모태그로 이벤트가 전달 되지 않음
  },[])

  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  // defaultProps = props의 기본값을 설정할때 사용
  closeButton : true, //  닫기버튼 항상 보이게

};

export default Menu;