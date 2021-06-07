import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';

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

const wsLink = new WebSocketLink({
    uri: process.env.NODE_ENV === 'production' ? 'wss://op.thesaracen.com:5000/graphql' : `ws://localhost:5000/graphql`,
    options: {
        reconnect: true,
    },
});

const httpLink = new RetryLink().split(
    (operation) => operation.getContext().version === 1,
    createHttpLink({
        uri: process.env.NODE_ENV === 'production' ? 'https://op.thesaracen.com:5000/graphql' : 'http://localhost:5000/graphql',
    }),
    createHttpLink({
        uri: process.env.NODE_ENV === 'production' ? 'https://shop.thesaracen.com:5000/graphql' : 'http://localhost:5000/graphql',
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

export const client = new ApolloClient({
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
