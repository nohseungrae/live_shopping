import { gql, useQuery } from '@apollo/client';

export const GET_LIVE_GOODS = gql`
    query getGoodsList($liveId: Int!) {
        getGoodsList(liveId: $liveId) {
            ok
            goodsList {
                id
                liveId
                goodsTitle
                goodsId {
                    id
                    thumbnail
                    template {
                        title
                        prices {
                            level
                            market_price
                            sale_price
                        }
                        brand {
                            name
                            eng_name
                        }
                    }
                }
            }
        }
    }
`;
export const useGetGoods = (liveId: number) => {
    return useQuery(GET_LIVE_GOODS, {
        variables: {
            liveId,
        },
        skip: liveId ? false : true,
    });
};
