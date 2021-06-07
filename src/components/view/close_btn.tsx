import { useReactiveVar } from '@apollo/client';
import React from 'react';
import {
    isBasketModalOnInVar,
    isFullOnInVar,
    isGoodsModalOnInVar,
    isLiveInVar,
    isOpenedInVar,
    isQnaModalOnInVar,
    isWriteOnInVar,
} from '../../apollo';
import { logout, quitGroup } from '../../hooks/useTim';
import CloseIcon from '@material-ui/icons/Close';

interface IClose {
    qnaModal?: boolean;
    goodsModal?: boolean;
    basketModal?: boolean;
}

export const CloseBtn: React.FC<IClose> = ({ qnaModal, goodsModal, basketModal }) => {
    const close = async (e: any) => {
        e.stopPropagation();
        if (qnaModal || goodsModal || basketModal) {
            const modalWrap: HTMLDivElement = document.querySelector('.qna_modal') as HTMLDivElement;
            modalWrap.classList.remove('animate-modal');
            modalWrap.classList.add('animate-modal-out');
            setTimeout(() => {
                if (qnaModal) {
                    isQnaModalOnInVar(false);
                }
                if (goodsModal) {
                    isGoodsModalOnInVar(false);
                }
                if (basketModal) {
                    isBasketModalOnInVar(false);
                }
            }, 1000);
        } else {
            // const result = await quitGroup();
            // if (result) {
            //     isOpenedInVar(false);
            //     isGoodsModalOnInVar(false);
            //     isQnaModalOnInVar(false);
            //     isWriteOnInVar(false);
            //     isFullOnInVar(false);
            // }
            console.log('나가기 버튼');
            // await quitGroup();
            const logoutResult = await logout();
            console.log(logoutResult);
            isOpenedInVar(false);
            isGoodsModalOnInVar(false);
            isBasketModalOnInVar(false);
            isQnaModalOnInVar(false);
            isWriteOnInVar(false);
            isFullOnInVar(false);
        }
    };
    console.log(process.env.PUBLIC_URL);
    return (
        <button className={qnaModal || goodsModal ? 'live_close_modal_btn' : 'live_close_btn'} onClick={close}>
            <span className={'blind'}>나가기</span>
            {qnaModal || goodsModal || basketModal ? (
                <CloseIcon />
            ) : (
                <svg
                    className={'live_icon_close'}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                >
                    <g id="close">
                        <image
                            id="벡터_고급_개체"
                            data-name="벡터 고급 개체"
                            x="5"
                            y="5"
                            width={'77'}
                            height={'77'}
                            xlinkHref="data:img/png;base64,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"
                        />
                    </g>
                </svg>
            )}
        </button>
    );
};
