import { gql, useQuery } from '@apollo/client';

export const GET_LIVE_USER_INFO = gql`
    query getOrCreateUserSig($input: LiveUserInput!) {
        getOrCreateUserSig(input: $input) {
            ok
            liveUser {
                userId
                liveId
                userSig
            }
        }
    }
`;

export const useGetLiveUserInfo = (userId: number, liveId: number) => {
    return useQuery(GET_LIVE_USER_INFO, {
        variables: {
            input: {
                userId,
                liveId,
            },
        },
        skip: liveId && userId ? false : true,
    });
};
