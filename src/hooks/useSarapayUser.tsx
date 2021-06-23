import { gql, useQuery } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
const httpLink2 = createHttpLink({
    fetch,
    uri: process.env.REACT_APP_BE_GQL_HOST,
});
const customClient = new ApolloClient({
    link: httpLink2,
    cache: new InMemoryCache(),
});
// const GET_SARAPAY_USER = gql`
//     query getSarapayUser($userKey: String!) {
//         getSarapayUser(userKey: $userKey) @rest(type: "Output", path: "/graphql", endpoint: "shop", method: "POST") {
//             success
//             msg
//             data {
//                 id
//                 userId
//                 cardNumber
//             }
//         }
//     }
// `;
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
        client: customClient,
        skip: userKey ? false : true,
    });
};
