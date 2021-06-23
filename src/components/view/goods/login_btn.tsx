import React from 'react';
import { isMobile, isTablet } from 'react-device-detect';
type TLogin = { title: string };

export const LoginBtn: React.FC<TLogin> = ({ title }) => {
    const goToLogin = (e: any) => {
        e.preventDefault();
        if (isMobile || isTablet) {
            window.location.href = '/auth/login';
        } else {
            window.openLogin();
        }
    };
    return (
        <button onClick={goToLogin} className={'goods_btn_common'}>
            <i>{title}</i>
            <span className={'blind'}>{title}</span>
        </button>
    );
};
