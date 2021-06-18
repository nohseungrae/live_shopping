import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, makeVar, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import { RestLink } from 'apollo-link-rest';

export const isOpenedInVar = makeVar(false);
export const isSoundOnInVar = makeVar(false);
export const isWriteOnInVar = makeVar(false);
export const isFullOnInVar = makeVar(false);
export const isQnaModalOnInVar = makeVar(false);
export const isGoodsModalOnInVar = makeVar(false);
export const isBasketModalOnInVar = makeVar(false);
export const isFullSizeWriteInVar = makeVar(false);
export const isLiveInVar = makeVar(false);
export const isNewQnaInVar = makeVar(false);
export const isAtLeastInVar = makeVar(false);

console.log(process.env.REACT_APP_WS_HOST);
const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_HOST as string,
    options: {
        reconnect: true,
    },
});

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_MAIN_GRAPHQL_HOST as string,
});

// const link = new RestLink({
//     endpoints: { shop: 'http://localhost:5001' },
//     headers: {
//         accept: '*/*',
//     },
// });
// const httpLink2 = createHttpLink({
//     uri: process.env.NODE_ENV === 'production' ? 'https://shop.thesaracen.com:5000/graphql' : 'http://localhost:5001/graphql',
// });

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

export const client = new ApolloClient({
    // link: ApolloLink.from([link, splitLink]),
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isOpened: {
                        read() {
                            return isOpenedInVar();
                        },
                    },
                    isSoundOn: {
                        read() {
                            return isSoundOnInVar();
                        },
                    },
                    isWriteOn: {
                        read() {
                            return isWriteOnInVar();
                        },
                    },
                    isFullOn: {
                        read() {
                            return isFullOnInVar();
                        },
                    },
                    isQnaModalOn: {
                        read() {
                            return isQnaModalOnInVar();
                        },
                    },
                    isGoodsModalOn: {
                        read() {
                            return isGoodsModalOnInVar();
                        },
                    },
                    isBasketModalOn: {
                        read() {
                            return isBasketModalOnInVar();
                        },
                    },
                    isFullSizeWriteInVar: {
                        read() {
                            return isFullSizeWriteInVar();
                        },
                    },
                    isLiveInVar: {
                        read() {
                            return isLiveInVar();
                        },
                    },
                    isNewQna: {
                        read() {
                            return isNewQnaInVar();
                        },
                    },
                    isAtLeastInVar: {
                        read() {
                            return isAtLeastInVar();
                        },
                    },
                },
            },
        },
    }),
});
