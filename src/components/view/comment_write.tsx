import React, { useCallback, useMemo, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import TIM from 'tim-js-sdk';
import { useGetStreamKey } from '../../hooks/useKey';
import { Constants } from '../../constants/common_constants';
import { tim } from '../../index';
import { getAllMessage } from '../../hooks/useTim';
import { useGetGoods } from '../../hooks/useGoods';

interface ICommentWrite {
    setMessageFunc: Function;
    userID: number;
}

const CREATE_LIVE_CHAT_QNA = gql`
    mutation createLiveChatQna($createLiveChatQnaInput: CreateLiveChatQnaInput!) {
        createLiveChatQna(createLiveChatQnaInput: $createLiveChatQnaInput) {
            ok
            chatQnaId
        }
    }
`;

export const CommentWrite: React.FC<ICommentWrite> = ({ setMessageFunc, userID }) => {
    const { data: getStreamData } = useGetStreamKey();
    const { data: goodsData } = useGetGoods(getStreamData?.getStreamKey?.id);

    const [comment, setComment] = useState('');
    const { data } = useGetStreamKey();
    const [createLiveChatQna] = useMutation(CREATE_LIVE_CHAT_QNA, {
        onCompleted: (data: any) => {
            const {
                createLiveChatQna: { ok },
            } = data;
            if (ok) {
                const textarea: any = document.querySelector('#write_textarea');
                textarea.value = '';
                setComment('');
            }
        },
    });

    const onKeyPress = useCallback(
        async (e: any) => {
            setComment(e.target.value);
            console.log('key press');
            if (e.keyCode === 13) {
                e.preventDefault();
                if (e.target.value === '') {
                    return;
                }
                if (chatOrQna) {
                    let message = await tim.createTextMessage({
                        to: Constants.groupID,
                        conversationID: `GROUP${Constants.groupID}`,
                        conversationType: TIM.TYPES.CONV_GROUP,
                        payload: {
                            text: e.target.value,
                        },
                    });
                    const sendResult = await tim.sendMessage(message);
                    if (sendResult?.data) {
                        const { messageMapping } = await getAllMessage();
                        // const messageList = await tim.getMessageList({ conversationID: `GROUP${Constants.groupID}` });
                        // const messageMapping = messageList.data.messageList
                        //     .map((message: any, index: number) => {
                        //         return {
                        //             username: message.nick,
                        //             text: message.payload.text,
                        //         };
                        //     })
                        //     .filter((item: any) => item);
                        setMessageFunc([...messageMapping]);
                    }
                    const textarea: any = document.querySelector('#write_textarea');
                    textarea.value = '';
                } else {
                    console.log(userID);
                    const askQna = (qna: string) => {
                        createLiveChatQna({
                            variables: {
                                createLiveChatQnaInput: {
                                    title: 'OO 상품 라이브 질문',
                                    liveId: data?.getStreamKey?.id,
                                    userId: userID,
                                    content: qna,
                                    adminId: 0,
                                },
                            },
                        });
                    };
                    askQna(e.target.value);
                }
            }
        },
        [comment]
    );

    const [chatOrQna, setChatOrQna] = useState(true);
    const changeChatOrQna = useCallback(
        (e: any) => {
            const {
                target: { id },
            } = e;
            console.log(id, chatOrQna);
            if (id === 'chat' && !chatOrQna) {
                setChatOrQna(true);
            }
            if (id === 'chat' && chatOrQna) {
                setChatOrQna(true);
            }
            if (id === 'qna' && chatOrQna) {
                setChatOrQna(false);
            }
            if (id === 'qna' && !chatOrQna) {
                setChatOrQna(false);
            }
        },
        [chatOrQna]
    );
    const style = useCallback(
        (goodsList: any[]) => {
            if (goodsList?.length < 1) {
                return {
                    width: 'calc(100% - 30px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            }
        },
        [goodsData]
    );
    return (
        <div
            onClick={(e: any) => {
                e.stopPropagation();
            }}
            className={`comment_write`}
            style={style(goodsData?.getGoodsList?.goodsList)}
        >
            <label className={'blind'} htmlFor={'write_textarea'}>
                댓글 입력
            </label>
            {/* <textarea className={'comment_write_text'} cols={1} style={{ display: 'none', height: '23px' }} /> */}
            <textarea
                className={'comment_write_text'}
                id={'write_textarea'}
                defaultValue={comment}
                placeholder={chatOrQna ? '실시간 채팅에 참여하세요' : '상품에 대해 물어보세요'}
                onKeyDown={onKeyPress}
                style={{ height: '45px' }}
            />
            <input className={'blind'} value={'채팅'} readOnly />
            <label
                id={'chat'}
                className={'comment_write_label'}
                onClick={changeChatOrQna}
                style={chatOrQna ? { color: '#fff', backgroundColor: '#303038' } : {}}
            >
                채팅
            </label>
            <input className={'blind'} value={'질문'} readOnly />
            <label
                id={'qna'}
                className={'comment_write_label'}
                onClick={changeChatOrQna}
                style={chatOrQna ? {} : { color: '#fff', backgroundColor: '#fd79a8' }}
            >
                질문
            </label>
        </div>
    );
};
