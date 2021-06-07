import React from 'react';

export const AtLeastBtn = () => {
    const atLeastClick = (e: any) => {
        e.stopPropagation();
        const comments: any = document.querySelector('.comments');
        comments.scrollTo({ top: comments.scrollHeight, behavior: 'auto' });
    };
    return (
        <button onClick={atLeastClick} className={'at_least_btn'}>
            최신으로 가기
        </button>
    );
};
