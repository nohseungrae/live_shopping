import React from 'react';

export const BasketBtn = () => {
    return (
        <button className={'goods_btn_common goods_btn_basket'}>
            <i>장바구니</i>
            <span className={'blind'}>장바구니</span>
        </button>
    );
};
