import React, { useEffect, useRef, useState } from 'react';
import { getAllMessage, IUser, updateProfile } from '../../hooks/useTim';
import TIM from 'tim-js-sdk';
import { IMessage } from './view_container';
import { Constants } from '../../constants/common_constants';
import { isAtLeastInVar, isFullOnInVar, isFullSizeWriteInVar, isOpenedInVar } from '../../apollo';
import { useReactiveVar } from '@apollo/client';
import { tim } from '../../index';

interface IProps {
    setMessageFunc: Function;
    message: IMessage[];
    userInfo: IUser;
}

export const Comments: React.FC<IProps> = ({ message, setMessageFunc, userInfo }) => {
    const commentsEndRef = useRef<HTMLDivElement>(null);
    const isFullSizeWriteOn = useReactiveVar(isFullSizeWriteInVar);
    const isOpened = useReactiveVar(isOpenedInVar);
    const isFullOn = useReactiveVar(isFullOnInVar);

    const [nextMessageId, setNextMessageId] = useState('');
    const nextMessageIdSetter = (id: string) => {
        setNextMessageId(id);
    };

    // tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function (event: any) {
    //     console.log(event);
    // });

    useEffect(() => {
        let onMessageReceived = async function (event: any) {
            console.log(event, 'event');
            const isSDKReady = event.name === TIM.EVENT.SDK_READY ? true : false;
            const { messageMapping } = await getAllMessage();
            setMessageFunc([...messageMapping]);
        };
        tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
        tim.on(TIM.EVENT.SDK_READY, onMessageReceived);
        return function cleanup() {
            if (!isOpened) {
                setMessageFunc([]);
            }
        };
    }, []);

    useEffect(() => {
        if (commentsEndRef.current) {
            console.log('wheel');
            commentsEndRef.current.onscroll = (e: any) => {
                e.preventDefault();
                console.log(e.target.scrollHeight, 'e.target.scrollHeight');
                console.log(e.target.scrollTop, 'e.target.scrollTop');
                console.log(e.target.offsetHeight, 'e.target.offsetHeight');
                console.log(e.target.offsetTop, 'e.target.offsetTop');
                // console.log(e.target.scrollHeight - e.target.scrollTop === e.target.offsetHeight);
                if (e.target.offsetHeight !== 160 && e.target.offsetHeight !== 380) {
                    return;
                }
                if (e.target.scrollHeight - e.target.scrollTop === e.target.offsetHeight) {
                    return isAtLeastInVar(false);
                } else {
                    return isAtLeastInVar(true);
                }
            };
            commentsEndRef.current.style.maxHeight = `${isFullSizeWriteOn ? 20 * message.length : 160}px`;

            setTimeout(() => {
                if (commentsEndRef?.current) {
                    commentsEndRef.current.scrollTo({ top: commentsEndRef.current.scrollHeight, behavior: 'auto' });
                    isAtLeastInVar(false);
                }
            }, 100);
        }

        return () => {
            if (commentsEndRef.current) {
                commentsEndRef.current.onscroll = null;
            }
        };
    }, [isFullSizeWriteOn, message]);

    return (
        <div
            onClick={(e: any) => {
                e.stopPropagation();
                if (isFullSizeWriteOn) {
                    isFullSizeWriteInVar(false);
                } else {
                    isFullSizeWriteInVar(true);
                }
            }}
            ref={commentsEndRef}
            className={`comments ${isFullOn ? 'invisible' : 'visible'}`}
        >
            <div className={'comments_inner'} style={{ height: `400px` }}>
                <div className={'comments_ani_area'}>
                    {message.map((m, i) => {
                        return (
                            <div className={'chat_box'} key={i}>
                                <strong className={'chat_name'}>{m.username} : </strong>
                                <span className={'chat_text'}>{m.text}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
