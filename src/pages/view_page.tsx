import { useReactiveVar } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { isLiveInVar, isOpenedInVar } from '../apollo';
import { ViewLayout } from '../components/view/view_layout';
import { useGetStreamKey } from '../hooks/useKey';
export const ViewPage = () => {
    const ref = useRef<any>(null);
    const openView = () => {
        isOpenedInVar(true);
    };
    const isOpened = useReactiveVar(isOpenedInVar);
    const isLive = useReactiveVar(isLiveInVar);
    const { data } = useGetStreamKey();
    useEffect(() => {
        if (data?.getStreamKey?.isLive && data?.getStreamKey?.isOnline) {
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
                        {/* <button onClick={openView} className={'bg-black text-white rounded-md'}>
                            let's go to View
                        </button> */}
                        <div className={'w-full h-full'}>
                            <img className={'w-full h-full'} src={'/assets/images/thumbnail.jpg'} />
                            <div>
                                <ReactPlayer
                                    className={'react_player'}
                                    ref={ref}
                                    light={false}
                                    volume={0}
                                    muted={true}
                                    width={'100%'}
                                    height={'100%'}
                                    playsinline={true}
                                    playing={isOpened}
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {isOpened && isLive ? <ViewLayout /> : null}
        </>
    );
};
