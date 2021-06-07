import React from 'react';
import { isBasketModalOnInVar } from '../../../apollo';
import { BasketModal } from './basket_modal';

export const BasketBox = () => {
    const CloseBasket = (e: any) => {
        e.stopPropagation();
        const modalWrap: HTMLDivElement = document.querySelector('.qna_modal') as HTMLDivElement;
        modalWrap.classList.remove('animate-modal');
        modalWrap.classList.add('animate-modal-out');
        setTimeout(() => {
            isBasketModalOnInVar(false);
        }, 500);
    };
    return (
        <div onClick={CloseBasket} className={'w-full absolute left-0 top-0 h-full'} style={{ zIndex: 70, background: 'rgba(0,0,0,0.5)' }}>
            <BasketModal />
        </div>
    );
};
