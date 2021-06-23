import { gql, useQuery } from '@apollo/client';

export const GET_STREAMKEY = gql`
    query getStreamKey {
        getStreamKey {
            id
            streamKey
            isLive
            imKey
            isOnline
            isShow
        }
    }
`;

export const useGetStreamKey = () => {
    return useQuery(GET_STREAMKEY);
};
