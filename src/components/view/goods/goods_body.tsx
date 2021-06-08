import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetGoods } from '../../../hooks/useGoods';
import { useGetStreamKey } from '../../../hooks/useKey';
import { useGetSarapayUser } from '../../../hooks/useSarapayUser';
import { BasketBtn } from './basket_btn';
import { BuyBtn } from './buy_btn';

export const GoodsBody: React.FC = () => {
    const { data: getStreamData } = useGetStreamKey();
    const { data: goodsData } = useGetGoods(getStreamData?.getStreamKey?.id);
    const { data } = useGetSarapayUser(
        'eyJpdiI6IjNpeVlIVDgzVWt6NHZRQnd6OXBaSHZITHdSU3FoSk00M3RsaDhjQ0NUSUU9IiwidmFsdWUiOiJONVpyazR0dWtETXg0dUxIbVBpUFVZU1o0TFBIZ216NjQ1Nkw3Y0J4K1FVPSIsIm1hYyI6IjAzN2E0MmNmOTE4YzllNDdjYTQxYmI0MDM4MDExOWVmMTNmOTJlOWI4MWQzZjQ1OTQzNzY1MTQ5ZDQ1ZWNlOWUifQ=='
    );
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
                    {goodsData?.getGoodsList?.goodsList?.map((item: any, index: number) => {
                        if (!item) {
                            return (
                                <div className={noneGoodsStyles} style={{ paddingBottom: '20px', color: '#929294' }}>
                                    등록된 상품이 없습니다.
                                </div>
                            );
                        }
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
                                        <span className={'goods_info_price'}>{item.goodsId.template[0].prices[0].market_price}</span>
                                        <span className={'goods_info_sale_price'}>{item.goodsId.template[0].prices[0].sale_price}</span>
                                        <span className={'goods_info_brandname'}>{item.goodsId.template[0].brand.name}</span>
                                    </div>
                                </a>
                                <div className={'goods_btn_wrapper'}>
                                    <BasketBtn />
                                    <BuyBtn success={data?.getSarapayUser?.success} />
                                </div>
                            </li>
                        );
                    })}{' '}
                </ul>
            </div>
        </div>
    );
};
