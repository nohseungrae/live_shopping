import React from 'react';
import { isBasketModalOnInVar, isGoodsModalOnInVar } from '../../apollo';

export const GoodsBtn = () => {
    const openGoods = (e: any) => {
        e.stopPropagation();
        isGoodsModalOnInVar(true);
    };
    return (
        <button onClick={openGoods} className={'btn'} style={{ bottom: '160px' }}>
            <span className={'btn_inner'}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="100%"
                    height="100%"
                    viewBox="0 0 80 80"
                >
                    <defs></defs>
                    <g id="cart">
                        <g id="그룹_5" data-name="그룹 5">
                            <circle id="타원_2" data-name="타원 2" className="cls-1" cx="40" cy="40" r="40" />
                            <image
                                id="벡터_고급_개체"
                                data-name="벡터 고급 개체"
                                x="22"
                                y="21"
                                width="35"
                                height="38"
                                xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAmCAYAAABOFCLqAAACZElEQVRYhc2YvW4TQRSFvxmtNtiynSjpUkQyBQVIKF2UHyQUKngCEI9gRINEwTNQQk2DQpkqKCBFFJFSpUqTKm1SBRETxE+KQ+E7eOzEHgfZXh9pNTsz9+45nrlzdmUwSMolvZJ0pPHgyPhyYkjKJG2PSUQ3tiVlAM7ENIA3pu2DXd8ZHarAE7sAnjnn3oaV2TOVWyMUcAmStox3D8Db+E1rPyWSlyU9leQScc7ilhN6Al8dILPODWubieTPQAU4Br70ibsPvAfOaW1JLwS+ErRXpmbtz4SYC2vvJOLC/EXfqDZfDcBbJYdl/51I3rf2cSIuzO/3jWrzOUmZp7XsAd8Sye+sXZX08qoAG1/tiu+Fs+i+gqT56Myv9Mu0wtyJ4jclPZR029rNaG5ngEJfieLnkVSPBhYTvwRJs5J2E0a2K2l2gGctRjl1D0xH8+epBzjnvgLrwHPgsGv60MbXLS6FmG8aSUuRuoUBHtABSXOSbkma+4/chYh7KcPOuCHlM5fgnDsFTq+bdwVfydNpSimfGTZivqoHpkLPOZfymaGiiy+PfebaWzQkBN6qB8rW+VOQmMBb9kD40vpRkJjAm3tgxjpJjxmxmJl4ZYraplDEeVwzRRdwOfaZXwWJCbzVeJuKFpPHK1P0NlU97XfTWN03QuAtxa+Don1mKvaZosVMhM8E3g6fOesRPGoE3nL81i7qaIcCrkyCz4QPrMnzmQAVoSTm9cCJ3T8oRss/3pMM2ABeAA1JAj4yng/zEvAIaFh/w0mqAbvA3TEI6IUD4J53zjWBNeA1rf9dxolj411zzjX/AmsCS5GoBeCsAAAAAElFTkSuQmCC"
                            />
                        </g>
                    </g>
                </svg>

                <span className={'blind'}>소개상품</span>
            </span>
        </button>
    );
};
