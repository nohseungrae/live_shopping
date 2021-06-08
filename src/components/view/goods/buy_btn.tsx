import React from 'react';

interface IBuyBtnProps {
    success: boolean;
}

export const BuyBtn: React.FC<IBuyBtnProps> = ({ success }) => {
    return (
        <a href={'/cs/sarapay'} className={'goods_btn_common goods_btn_buy'}>
            <i>{success ? <span>바로구매</span> : `구매하기`}</i>
            <span className={'blind'}>구매하기</span>
        </a>
    );
};
