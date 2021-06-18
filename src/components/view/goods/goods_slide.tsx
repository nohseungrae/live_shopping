import React from 'react';
import { isGoodsModalOnInVar } from '../../../apollo';
import { useGetGoods } from '../../../hooks/useGoods';
import { useGetStreamKey } from '../../../hooks/useKey';
import Slick from 'react-slick';

export const GoodsSlide = () => {
    const { data: getStreamData } = useGetStreamKey();
    const { data: goodsData } = useGetGoods(getStreamData?.getStreamKey?.id);
    // console.log(goodsData);
    const openGoods = (e: any) => {
        e.stopPropagation();
        isGoodsModalOnInVar(true);
    };
    return goodsData?.getGoodsList?.goodsList?.length < 1 ? null : (
        <div className={'live_basket_box z-50'} onClick={openGoods}>
            <div className={'live_basket_inner'}>
                <Slick
                    adaptiveHeight={true}
                    infinite={true}
                    initialSlide={0}
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    vertical={goodsData?.getGoodsList?.goodsList?.length === 1 ? false : true}
                    verticalSwiping={false}
                    autoplay={goodsData?.getGoodsList?.goodsList?.length === 1 ? false : true}
                    autoplaySpeed={5000}
                    centerPadding={'0px'}
                >
                    {goodsData?.getGoodsList?.goodsList?.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <img
                                    className={'rounded-lg'}
                                    src={`https://active.thesaracen.com/img/template/goods/${item.goodsId.id}/${item.goodsId.thumbnail}`}
                                />
                            </div>
                        );
                    })}
                </Slick>
            </div>
        </div>
    );
};
