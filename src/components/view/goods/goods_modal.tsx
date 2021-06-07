import React from 'react';
import { CommonHeader } from '../common_header';
import { GoodsBody } from './goods_body';

export const GoodsModal = () => {
    return (
        <div
            onClick={(e: any) => {
                e.stopPropagation();
            }}
            className={`qna_modal animate-modal`}
        >
            <div className={'qna_wrap'}>
                <CommonHeader title={'소개 상품'} modalName={'goods'} />
                <GoodsBody />
            </div>
        </div>
    );
};
