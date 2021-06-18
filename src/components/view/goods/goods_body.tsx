import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetGoods } from '../../../hooks/useGoods';
import { useGetStreamKey } from '../../../hooks/useKey';
import { useGetSarapayUser } from '../../../hooks/useSarapayUser';
import { comma } from '../../../utils/comma';
import { discount } from '../../../utils/discount';
import { userInfo } from '../view_container';
import { BasketBtn } from './basket_btn';
import { BuyBtn } from './buy_btn';

export const GoodsBody: React.FC = () => {
    const userKey = window.userKey;
    const { data: getStreamData } = useGetStreamKey();
    const { data: goodsData } = useGetGoods(getStreamData?.getStreamKey?.id);
    const { data } = useGetSarapayUser(userKey);
    // const [sarapayUser, setSarapayUser] = useState(false);
    // const sarapayUserCheck = useCallback((success: boolean) => {
    //     if (success) {
    //         setSarapayUser(true);
    //     } else {
    //         setSarapayUser(false);
    //     }
    // }, []);

    const noneGoodsStyles = useMemo(() => 'flex h-full justify-center items-center font-medium', []);

    return (
        <div>
            <h4 className={'blind'}>{'소개상품'}</h4>
            <div className={'box-border overflow-y-auto'} style={{ height: '400px' }}>
                <ul className={'relative goods_list_ul h-full'}>
                    {goodsData?.getGoodsList?.goodsList?.length < 1 ? (
                        <div className={noneGoodsStyles} style={{ paddingBottom: '20px', color: '#929294' }}>
                            등록된 상품이 없습니다.
                        </div>
                    ) : (
                        goodsData?.getGoodsList?.goodsList?.map((item: any, index: number) => {
                            console.log(item);
                            const priceSeperate = (level: number) => {
                                let marketPrice = 0;
                                let salePrice = 0;
                                if (level === 0) {
                                    marketPrice = item.goodsId.template?.prices[0].market_price;
                                    salePrice = item.goodsId.template?.prices[0].market_price;
                                }
                                if (0 < level && level < 4) {
                                    marketPrice = item.goodsId.template?.prices[0].market_price;
                                    salePrice = item.goodsId.template?.prices[0].sale_price;
                                }
                                if (3 < level) {
                                    marketPrice = item.goodsId.template?.prices[1].market_price;
                                    salePrice = item.goodsId.template?.prices[1].sale_price;
                                }
                                return { marketPrice, salePrice };
                            };
                            const { marketPrice, salePrice } = priceSeperate(userInfo?.level);
                            // const marketPrice = item.goodsId.template[0].prices[0].market_price;
                            // const salePrice = item.goodsId.template[0].prices[0].sale_price;
                            return (
                                <li key={index} className={'goods_list_li'}>
                                    <a
                                        href={`/goods/${item.goodsId.id}`}
                                        key={item.goodsId.id}
                                        className={'block relative'}
                                        style={{ paddingLeft: '88px' }}
                                    >
                                        <div className={'thumbnail'}>
                                            <img
                                                className={'rounded-lg'}
                                                src={`https://active.thesaracen.com/img/template/goods/${item.goodsId.id}/${item.goodsId.thumbnail}`}
                                            />
                                        </div>
                                        <div className={'goods_info'}>
                                            <span className={'goods_info_name'}>{item.goodsTitle}</span>
                                            <span className={'goods_info_price'}>
                                                <span className={'price_percent'}>{discount(marketPrice, salePrice)}</span>
                                                <span className={'goods_market_price'}>{comma(marketPrice)}</span>
                                            </span>
                                            <span className={'goods_info_sale_price'}>{comma(salePrice)}</span>
                                            <span className={'goods_info_brandname'}>{item.goodsId.template?.brand.name}</span>
                                        </div>
                                    </a>
                                    <div className={'goods_btn_wrapper'}>
                                        <BasketBtn />
                                        <BuyBtn success={data?.getSarapayUser?.success} />
                                    </div>
                                </li>
                            );
                        })
                    )}{' '}
                </ul>
            </div>
        </div>
    );
};
