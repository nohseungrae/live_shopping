import { gql, OnSubscriptionDataOptions, useReactiveVar } from '@apollo/client';
import moment from 'moment';
import React from 'react';
import { isNewQnaInVar } from '../../../apollo';
import { useGetStreamKey } from '../../../hooks/useKey';
import {
    GET_CHAT_QNA,
    useAnswerdChatQnaSub,
    useGetChatQnaList,
    useGetQnaList,
    usePendingChatQnaSub,
    useDeletedChatQnaSub,
} from '../../../hooks/useQna';
import 'moment/locale/ko';
import { maskingName } from '../../../utils/start';

interface IProps {
    tab: { [qna: string]: boolean; live_qna: boolean };
}
type P = keyof IProps;
export const FULL_LIVE_CHAT_QNS_FRAGMENT = gql`
    fragment FullLiveChatQnaParts on ShopLiveChatQna {
        id
        title
        content
        answer
        liveId
        userId {
            name
        }
        adminId
        updated_at
    }
`;
export const ANSWERD_CHAT_QNA_SUBSCRIPTION = gql`
    subscription answeredChatQna {
        answeredChatQna {
            ...FullLiveChatQnaParts
        }
    }
    ${FULL_LIVE_CHAT_QNS_FRAGMENT}
`;
export const QnaBody: React.FC<IProps> = ({ tab }) => {
    const { data: getStreamData } = useGetStreamKey();
    const { data: qnaData } = useGetQnaList();
    const { data: liveQnaData } = useGetChatQnaList(getStreamData?.getStreamKey?.id);

    const isNewQna = useReactiveVar(isNewQnaInVar);

    const values = Object.keys(tab)
        .map((key) => {
            if (tab[key]) {
                return key;
            }
        })
        .filter((item) => item);
    // console.log(qnaData, liveQnaData);
    // console.log(values);
    return (
        <div>
            <h4 className={'blind'}>{values[0]}</h4>
            <div className={'box-border overflow-y-auto'} style={{ height: '400px', padding: '28px 22px 0' }}>
                {values[0] === 'qna' ? (
                    qnaData?.getQnaList?.qnaList.length < 1 ? (
                        <div
                            className={'flex h-full justify-center items-center font-medium'}
                            style={{ paddingBottom: '20px', color: '#929294' }}
                        >
                            자주 묻는 질문이 없습니다.
                        </div>
                    ) : (
                        qnaData?.getQnaList?.qnaList.map((item: any, index: number) => {
                            return (
                                <dl key={index} className={'break-all'}>
                                    <dt>
                                        <div className={'qna_list_info'}>
                                            <time>{moment(item.updated_at).format('LLL')}</time>
                                            <span className={'side_bar'}>관리자</span>
                                        </div>
                                        <span className={'qna_list_info_content'}>Q. {item.content}</span>
                                    </dt>
                                    <dd className={'qna_list_info_answer'}>{item.answer ?? '답변중입니다...'}</dd>
                                </dl>
                            );
                        })
                    )
                ) : liveQnaData?.getChatQnaListByLiveId?.chatQnaList.length < 1 ? (
                    <div
                        className={'flex h-full justify-center items-center font-medium'}
                        style={{ paddingBottom: '20px', color: '#929294' }}
                    >
                        라이브 답글이 없습니다.
                    </div>
                ) : (
                    liveQnaData?.getChatQnaListByLiveId?.chatQnaList.map((item: any, index: number) => {
                        return (
                            <dl key={index} className={'break-all'}>
                                <dt>
                                    <div className={'qna_list_info'}>
                                        <time>{moment(item.updated_at).format('LLL')}</time>
                                        <span className={'side_bar'}>{maskingName(item.userId.name)}</span>
                                    </div>
                                    <span className={'qna_list_info_content'}>Q. {item.content}</span>
                                </dt>
                                <dd className={'qna_list_info_answer'}>{item.answer ?? '답변중입니다...'}</dd>
                            </dl>
                        );
                    })
                )}
            </div>
        </div>
    );
};
