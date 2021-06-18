import { useReactiveVar } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { isLiveInVar, isOpenedInVar } from '../apollo';
import { ViewLayout } from '../components/view/view_layout';
import { useGetStreamKey } from '../hooks/useKey';
import { useCallback } from 'react';
import { flvDestroy, flvLoad } from '../hooks/usePlayer';
import FlvJs from 'flv.js';
export let player1: any;
export const ViewPage = () => {
    const ref = useRef<any>(null);

    const openView = useCallback(() => {
        if (player1 && player1._mediaInfo) {
            console.log(player1);

            // flvDestroy(player1);
            player1.unload();
        }
        isOpenedInVar(true);
    }, []);
    const isOpened = useReactiveVar(isOpenedInVar);
    const isLive = useReactiveVar(isLiveInVar);
    const { data } = useGetStreamKey();

    // const reactPlayerConfig = {
    //     url: isOpened ? '' : `https://live.thesaracen.com/${data?.getStreamKey?.streamKey.split('?').join('.flv?')}`,
    //     light: false,
    //     volume: 1,
    //     muted: true,
    //     width: '100%',
    //     height: '100%',
    //     playsinline: isOpened ? false : true,
    //     playing: isOpened ? false : true,
    //     controls: true,
    // };

    useEffect(() => {
        if (ref.current && !isOpened) {
            if (!player1) {
                player1 = flvLoad(data?.getStreamKey?.streamKey, player1, ref);
            } else {
                player1.unload();
                player1.attachMediaElement(ref.current);
                player1.load();
                player1.play();
            }
            // console.log(player1._msectl);
            // player1._msectl.onsourceclose = (err: any) => {
            //     console.log('source error', err);
            // };
        }
    });
    // player1?.on(FlvJs.Events.ERROR, (err: any) => {
    //     if (err === FlvJs.ErrorTypes.NETWORK_ERROR) {
    //         console.log(`A network error was detected on camera Attempting to restart it.`);
    //         player1.unload();
    //     }
    // });
    // player1?.off(FlvJs.Events.ERROR, (err: any) => {
    //     console.log(`error off ==================================================`);
    // });
    useEffect(() => {
        if (data?.getStreamKey?.isLive === 1 && data?.getStreamKey?.isOnline === 1) {
            isLiveInVar(true);
        } else {
            isLiveInVar(false);
        }
    }, [data]);

    return (
        <>
            {isLive ? (
                <div className={'video_card'} onClick={openView}>
                    <div className={'video_wrap'}>
                        <div className={'w-full h-full'}>
                            <div className={`w-full h-full relative sub_video_box`}>
                                <img className={'w-full h-full'} src={'static/pc/images/live_thumbnail.jpg'} />
                                <img
                                    className={'absolute left-0 top-0 right-0 bottom-0 w-full h-full z-10'}
                                    style={{ borderRadius: '0.7em' }}
                                    src={'static/pc/images/story_overlay.png'}
                                />
                                <span
                                    className={'absolute left-0 bottom-0 w-full z-10 text-center'}
                                    style={{ bottom: '15px', color: 'rgb(255,255,255)' }}
                                >
                                    사라 라이브!
                                </span>
                            </div>
                            <div className={'full_size_absolute'}>
                                <video
                                    ref={ref}
                                    className="flv_player sub_player"
                                    autoPlay
                                    onError={(e: any) => console.log(e, 'eheheheheheheheheh------------------')}
                                >
                                    <source src={ref?.current?.src} />
                                </video>

                                {/* <ReactPlayer
                                    className={'react_player'}
                                    ref={ref}
                                    {...reactPlayerConfig}
                                    onProgress={({ played }) => {
                                        //playedSeconds : 현재 플레이 된 시간
                                        //loadedSeconds : 현재 다운로드 된 영상의 총 시간
                                        //played : 플레이된 총 양 0~1
                                        //loaded : 다운로드 된 총 양 0~1 웬만하면 1인듯
                                        // console.log(played);
                                    }}
                                    onReady={(player: ReactPlayer) => {
                                        // isLiveInVar(true);
                                        console.log('ready', player);
                                        // player.seekTo(player.getSecondsLoaded());
                                    }}
                                    onStart={() => {
                                        console.log('start');
                                    }}
                                    onPause={() => {
                                        console.log('pause');
                                    }}
                                    onBuffer={() => {
                                        console.log('buffer');
                                    }}
                                    onBufferEnd={() => {
                                        console.log('buffer end - 시작인듯');
                                    }}
                                    onError={(e: any, data?: any, hlsInstance?: any, hlsGlobal?: any) => {
                                        console.log('error', e.target, data);
                                        switch (e.target.error.code) {
                                            case e.target.error.MEDIA_ERR_ABORTED:
                                                alert('You aborted the video playback.');
                                                break;
                                            case e.target.error.MEDIA_ERR_NETWORK:
                                                alert('A network error caused the video download to fail part-way.');
                                                break;
                                            case e.target.error.MEDIA_ERR_DECODE:
                                                alert(
                                                    'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.'
                                                );
                                                break;
                                            case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                                alert(
                                                    'The video could not be loaded, either because the server or network failed or because the format is not supported.'
                                                );
                                                break;
                                            default:
                                                alert('An unknown error occurred.');
                                                break;
                                        }
                                        if (e.isTrusted) {
                                            console.log(hlsGlobal, hlsInstance);
                                        }
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {isOpened && isLive ? <ViewLayout /> : null}
        </>
    );
};
