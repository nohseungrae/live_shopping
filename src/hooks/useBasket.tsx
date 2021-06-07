import { gql, useQuery } from '@apollo/client';

const GET_WISHLIST_BY_USER_ID = gql`
    query getWishlistByUserId($input: ShopUserWishlistInput!) {
        getWishlistByUserId(input: $input) {
            ok
            wishlist {
                userId
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

export const useGetWishlist = () => {
    return useQuery(GET_WISHLIST_BY_USER_ID, {
        variables: {
            input: {
                id: parseInt(localStorage.getItem('userID') as string),
            },
        },
        skip: parseInt(localStorage.getItem('userID') as string) ? false : true,
    });
};
