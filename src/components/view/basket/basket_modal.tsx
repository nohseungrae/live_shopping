import React from 'react';
import { CommonHeader } from '../common_header';
import { BasketBody } from './basket_body';

export const BasketModal = () => {
    return (
        <div
            onClick={(e: any) => {
                e.stopPropagation();
            }}
            className={`qna_modal animate-modal`}
        >
            <div className={'qna_wrap'}>
                <CommonHeader title={'장바구니'} modalName={'basket'} />
                <BasketBody />
            </div>
        </div>
    );
};
