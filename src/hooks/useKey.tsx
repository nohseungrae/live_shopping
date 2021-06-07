import { gql, useQuery } from '@apollo/client';

export const GET_STREAMKEY = gql`
    query getStreamKey {
        getStreamKey {
            id
            streamKey
            isLive
            imKey
            isOnline
        }
    }
`;

export const useGetStreamKey = () => {
    return useQuery(GET_STREAMKEY);
};
