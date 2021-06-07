import React from 'react';
import { isQnaModalOnInVar } from '../../../apollo';
import { QnaModal } from './qna_modal';

export const QnaBox = () => {
    const closeQna = (e: any) => {
        e.stopPropagation();
        const modalWrap: HTMLDivElement = document.querySelector('.qna_modal') as HTMLDivElement;
        modalWrap.classList.remove('animate-modal');
        modalWrap.classList.add('animate-modal-out');
        setTimeout(() => {
            isQnaModalOnInVar(false);
        }, 500);
    };
    return (
        <div onClick={closeQna} className={'w-full absolute left-0 top-0 h-full'} style={{ zIndex: 70, background: 'rgba(0,0,0,0.5)' }}>
            <QnaModal />
        </div>
    );
};
