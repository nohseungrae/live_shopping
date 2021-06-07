import React from 'react';

interface IProps {
    tab: { qna: boolean; live_qna: boolean };
    settingTab: any;
}
export const QnaTabList: React.FC<IProps> = ({ tab, settingTab }) => {
    return (
        <div className={'flex flex-nowrap flex-1'}>
            <button
                onClick={settingTab}
                name={'qna'}
                className={`outline-none ${tab.qna ? 'selected_tab' : ''}`}
                style={{ padding: '10px 15px', outlineStyle: 'none' }}
            >
                자주 묻는 질문
            </button>
            <button
                onClick={settingTab}
                name={'live_qna'}
                className={`outline-none ${tab.live_qna ? 'selected_tab' : ''}`}
                style={{ padding: '10px 15px', outlineStyle: 'none' }}
            >
                라이브 답글
            </button>
        </div>
    );
};
