import { useReactiveVar } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import { isFullOnInVar } from '../../apollo';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { getGroupOnlineMembers } from '../../hooks/useTim';
import { tim } from '../..';
import TIM from 'tim-js-sdk';

interface IViewHeaderProps {
    count: number;
    countSetter: any;
}

export const ViewHeader: React.FC<IViewHeaderProps> = ({ count, countSetter }) => {
    const isFullOn = useReactiveVar(isFullOnInVar);
    const headerStyles = useMemo(() => 'absolute top-0 left-0 z-40 w-full', []);

    // tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, (e: any) => getGroupOnlineMembers(countSetter));
    tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, (e: any) => {
        console.log(e);
    });

    return (
        <header className={headerStyles}>
            <h1>
                <a className={'inline-block'} style={{ padding: '13px 15px', marginTop: '5px' }} href={'https://thesaracen.com'}>
                    <svg
                        style={{ width: '110px', height: '30px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="273"
                        height="80"
                        viewBox="0 0 273 80"
                    >
                        <g id="logo">
                            <image
                                id="벡터_고급_개체"
                                data-name="벡터 고급 개체"
                                width="273"
                                height="80"
                                xlinkHref="data:img/png;base64,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"
                            />
                        </g>
                    </svg>
                    <span className={'blind'}>사라 라이브 쇼핑</span>
                </a>
            </h1>
            {isFullOn ? null : (
                <div className={'live_header_title'}>
                    <a href={'https://thesaracen.com'} className={'live_header_link'}>
                        <img className={'img'} src={'assets/images/saracen_logo.png'} />
                    </a>
                    <h2 className={'live_header_name'}>사라센 라이브 방송 타이틀</h2>
                    <div className={'live_header_item_box'}>
                        <span>
                            <PlayArrowIcon style={{ fontSize: '1rem', marginLeft: '-4px' }} className={'live_icon_view'}></PlayArrowIcon>
                            <span className={'blind'}>동시 접속자 수</span>
                            <span style={{ verticalAlign: 'middle' }}>{count}</span>
                        </span>
                        {/* <span>
                        <i></i>
                        <span className={'blind'}>총 좋아요 수</span>
                        <span></span>
                    </span> */}
                    </div>
                </div>
            )}
        </header>
    );
};
