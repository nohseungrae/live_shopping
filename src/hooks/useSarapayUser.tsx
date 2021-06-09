import { gql, useQuery } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
const httpLink2 = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://shop.thesaracen.com:5000/graphql"
      : "http://localhost:5001/graphql",
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
