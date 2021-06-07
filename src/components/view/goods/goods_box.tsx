import React from 'react';
import { isGoodsModalOnInVar } from '../../../apollo';
import { GoodsModal } from './goods_modal';

export const GoodsBox = () => {
    const CloseGoods = (e: any) => {
        e.stopPropagation();
        const modalWrap: HTMLDivElement = document.querySelector('.qna_modal') as HTMLDivElement;
        modalWrap.classList.remove('animate-modal');
        modalWrap.classList.add('animate-modal-out');
        setTimeout(() => {
            isGoodsModalOnInVar(false);
        }, 500);
    };
    return (
        <div onClick={CloseGoods} className={'w-full absolute left-0 top-0 h-full'} style={{ zIndex: 70, background: 'rgba(0,0,0,0.5)' }}>
            <GoodsModal />
        </div>
    );
};
