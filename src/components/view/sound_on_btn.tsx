import React from 'react';
import { isSoundOnInVar } from '../../apollo';

export const SoundOnBtn = () => {
    let video: HTMLVideoElement | null = document.querySelector('.react_player > video');
    const soundOn = (e: any) => {
        e.stopPropagation();
        if (video) {
            isSoundOnInVar(true);
            video.muted = false;
        }
    };
    return video ? (
        <button className={'live_sound_on_btn'} onClick={soundOn}>
            소리를 켜려면 누르세요
            <span className={'blind'}>소리</span>
        </button>
    ) : null;
};
