import React from 'react';
import { isSoundOnInVar } from '../../apollo';

export const SoundOnBtn = () => {
    const soundOn = (e: any) => {
        e.stopPropagation();
        let video: HTMLVideoElement | null = document.querySelector('.react_player > video');
        if (video) {
            isSoundOnInVar(true);
            video.muted = false;
        }
    };
    return (
        <button className={'live_sound_on_btn'} onClick={soundOn}>
            <i className={''}></i>
            소리를 켜려면 누르세요
            <span className={'blind'}>소리</span>
        </button>
    );
};
