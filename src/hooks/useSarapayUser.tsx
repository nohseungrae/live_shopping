import { gql, useQuery } from '@apollo/client';

const GET_SARAPAY_USER = gql`
    query getSarapayUser($userKey: String!) {
        getSarapayUser(userKey: $userKey) {
            success
            msg
            data {
                id
                userId
                cardNumber
            }
        }
    }
`;

export const useGetSarapayUser = (userKey: string) => {
    return useQuery(GET_SARAPAY_USER, {
        variables: { userKey },
    });
};
