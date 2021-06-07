import React from 'react';
import { CloseBtn } from './close_btn';

interface IProps {
    title: string;
    modalName: string;
}

export const CommonHeader: React.FC<IProps> = ({ title, modalName }) => {
    return (
        <div className={'qna_header'}>
            <h3 className={'qna_header_title'}>{title}</h3>
            <CloseBtn
                qnaModal={modalName === 'qna' ? true : false}
                goodsModal={modalName === 'goods' ? true : false}
                basketModal={modalName === 'basket' ? true : false}
            />
        </div>
    );
};
