import React from 'react';
import { isWriteOnInVar } from '../../apollo';

export const CommentBtn = () => {
    const onWrite = (e: any) => {
        e.stopPropagation();
        isWriteOnInVar(true);
    };
    return (
        <button onClick={onWrite} className={'btn'} style={{ bottom: '10px' }}>
            <span className={'btn_inner'}>
                <i>BTN</i>
                <span className={'blind'}>채팅질문</span>
            </span>
        </button>
    );
};
