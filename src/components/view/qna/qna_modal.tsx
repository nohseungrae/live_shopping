import React, { useEffect, useState } from 'react';
import { QnaBody } from './qna_body';
import { CommonHeader } from '../common_header';
import { QnaTabList } from './qna_tab_list';
import { isNewQnaInVar } from '../../../apollo';
import { useReactiveVar } from '@apollo/client';

export const QnaModal = () => {
    const isNewQna = useReactiveVar(isNewQnaInVar);

    const [tab, setTab] = useState<any>({
        qna: isNewQna ? false : true,
        live_qna: isNewQna,
    });
    const settingTab = (e: any) => {
        const name = e?.target?.name;

        if (name === 'qna') {
            setTab({ ...tab, live_qna: false, [name]: true });
        }
        if (name === 'live_qna') {
            setTab({ ...tab, qna: false, [name]: true });
        }
    };

    useEffect(() => {
        if (isNewQna) {
            isNewQnaInVar(false);
        }
    }, [isNewQna]);

    return (
        <div
            onClick={(e: any) => {
                e.stopPropagation();
            }}
            className={`qna_modal animate-modal`}
        >
            <div className={'qna_wrap'}>
                <CommonHeader title={'질문 모아보기'} modalName={'qna'} />
                <QnaTabList tab={tab} settingTab={settingTab} />
                <QnaBody tab={tab} />
            </div>
        </div>
    );
};
