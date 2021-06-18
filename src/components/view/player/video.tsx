import { useReactiveVar } from '@apollo/client';
import FlvJs from 'flv.js';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { isLiveInVar, isOpenedInVar } from '../../../apollo';
import { useGetStreamKey } from '../../../hooks/useKey';
import { flvLoad } from '../../../hooks/usePlayer';
export let player2: any;
interface IVideoProps {
    playStateSetting?: any;
    playState?: any;
}
export const Video: React.FC<IVideoProps> = ({ playState, playStateSetting }) => {
    const [flvUrl, setFlvUrl] = useState<any>(null);
    const { data } = useGetStreamKey();
    const ref = useRef<any>(null);

    const isOpened = useReactiveVar(isOpenedInVar);

    useEffect(() => {
        if (ref.current && isOpened) {
            ref.current.poster = 'static/pc/images/live_thumbnail.jpg';
            if (!playState) {
                playStateSetting(flvLoad(data?.getStreamKey?.streamKey, player2, ref));
            }
        }
    });

    // const reactPlayerConfig = {
    //     url: isOpened ? `https://live.thesaracen.com/${data?.getStreamKey?.streamKey.split('?').join('.flv?')}` : '',
    //     light: false,
    //     volume: 1,
    //     muted: true,
    //     width: '100%',
    //     height: '100%',
    //     playsinline: isOpened,
    //     playing: isOpened,
    // };
    return (
        <div className={'video_container'}>
            <div className={'video_source_shadow relative w-full h-full'}>
                <div className={'video_source_container w-full h-full'}>
                    <div className={'video_source_shadow absolute w-full h-full'}>
                        <div className={'video_source_wrapper relative w-full h-full'}>
                            <video ref={ref} className="flv_player main_player" autoPlay>
                                메인 사라 라이브
                            </video>
                            {/* <div ref={ref} id="playerView"></div> */}
                            {/* <ReactPlayer
                                className={'react_player'}
                                ref={ref}
                                {...reactPlayerConfig}
                                // fallback={<div>ㅎㅇ</div>}
                                //플레이어의 재생 속도 설정◦ YouTube, Wistia 및 파일 경로에서만 지원
                                // playbackRate={1}

                                //플레이 버튼? 이미지
                                // playIcon={
                                //     <img src={'https://active.thesaracen.com/img/banner/image/0/edd57fd9b06b654fc2461612734f5c44.jpg'} />
                                // }
                                // previewTabIndex={1}
                                onProgress={(state) => {
                                    //playedSeconds : 현재 플레이 된 시간
                                    //loadedSeconds : 현재 다운로드 된 영상의 총 시간
                                    //played : 플레이된 총 양 0~1
                                    //loaded : 다운로드 된 총 양 0~1 웬만하면 1인듯
                                    // console.log(state);
                                }}
                                onDuration={(duration) => {
                                    console.log('duration', duration);
                                }}
                                onBuffer={() => {
                                    console.log('buffer 시작중', ref);
                                }}
                                onReady={(player: ReactPlayer) => {
                                    // isLiveInVar(true);
                                    console.log('ready', player);
                                    // player.seekTo(player.getSecondsLoaded());
                                }}
                                onStart={() => {
                                    console.log('start');
                                }}
                                onSeek={(seconds: number) => {
                                    console.log('onSeek', seconds);
                                    ref.current.seekOnPlay = true;
                                }}
                                onError={(e: any, data?: any, hlsInstance?: any, hlsGlobal?: any) => {
                                    console.log('error', e.target, data);
                                    // const reactPlayer = document.querySelector('react_player');
                                    // reactPlayer?.removeChild(e.target);
                                    // switch (e.target.error.code) {
                                    //     case e.target.error.MEDIA_ERR_ABORTED:
                                    //         alert('You aborted the video playback.');
                                    //         break;
                                    //     case e.target.error.MEDIA_ERR_NETWORK:
                                    //         alert('A network error caused the video download to fail part-way.');
                                    //         break;
                                    //     case e.target.error.MEDIA_ERR_DECODE:
                                    //         alert(
                                    //             'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.'
                                    //         );
                                    //         break;
                                    //     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                    //         alert(
                                    //             'The video could not be loaded, either because the server or network failed or because the format is not supported.'
                                    //         );
                                    //         break;
                                    //     default:
                                    //         alert('An unknown error occurred.');
                                    //         break;
                                    // }
                                    return;
                                }}
                                onPlay={() => {
                                    const dim: HTMLDivElement | null = document.querySelector('.dimmed');
                                    console.log('onPlay');
                                    if (dim) {
                                        dim.style.display = 'none';
                                    }
                                }}
                                onEnded={() => {
                                    console.log('끝');
                                    const dim: HTMLDivElement | null = document.querySelector('.dimmed');
                                    if (dim) {
                                        isLiveInVar(false);
                                        dim.style.display = 'block';
                                    }
                                }}
                                config={{
                                    file: {
                                        forceFLV: true,
                                    },
                                }}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
