import { gql, useQuery, useSubscription } from '@apollo/client';

export const GET_QNA = gql`
    query getQnaList {
        getQnaList {
            ok
            qnaList {
                id
                title
                content
                answer
                updated_at
            }
        }
    }
`;

export const useGetQnaList = () => {
    return useQuery(GET_QNA);
};

export const GET_CHAT_QNA = gql`
    query getChatQnaListByLiveId($input: LiveChatQnaListInput!) {
        getChatQnaListByLiveId(input: $input) {
            ok
            chatQnaList {
                id
                title
                content
                answer
                updated_at
                userId {
                    name
                }
            }
        }
    }
`;
export const useGetChatQnaList = (liveId: number) => {
    // console.log(liveId);
    return useQuery(GET_CHAT_QNA, {
        variables: {
            input: {
                liveId,
            },
        },
        skip: liveId ? false : true,
    });
};

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
export const useAnswerdChatQnaSub = (onSubscriptionData: any) => {
    return useSubscription(ANSWERD_CHAT_QNA_SUBSCRIPTION, { onSubscriptionData });
};

export const PENDING_NEW_CHAT_QNA_SUBSCRIPTION = gql`
    subscription pendingChatQna {
        pendingChatQna {
            ...FullLiveChatQnaParts
        }
    }
    ${FULL_LIVE_CHAT_QNS_FRAGMENT}
`;
export const usePendingChatQnaSub = (onSubscriptionData: any) => {
    return useSubscription(PENDING_NEW_CHAT_QNA_SUBSCRIPTION, {
        onSubscriptionData,
    });
};

export const LIVE_CHAT_QNS_DELETED_FRAGMENT = gql`
    fragment LiveChatQnaDeletedParts on ShopLiveChatQna {
        id
        liveId
    }
`;
export const DELETED_CHAT_QNA_SUBSCRIPTION = gql`
    subscription deletedChatQna {
        deletedChatQna {
            ...LiveChatQnaDeletedParts
        }
    }
    ${LIVE_CHAT_QNS_DELETED_FRAGMENT}
`;
export const useDeletedChatQnaSub = (onSubscriptionData: any) => {
    return useSubscription(DELETED_CHAT_QNA_SUBSCRIPTION, {
        onSubscriptionData,
    });
};
