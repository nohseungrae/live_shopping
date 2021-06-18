// import TwebLive from 'tweblive';

// export const createInstance = () => {
//     let player = TwebLive.createPlayer();
//     player.setCustomConfig({
//         autoplay: true,
//         poster: {
//             style: 'cover',
//             src: 'https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20180302_108%2F1985wc_1519956283725wdWta_JPEG%2F2587463380360135_853222724.jpg%22&service=selective&type=f80_80_q90',
//         },
//         pausePosterEnabled: false,
//         wording: {
//             1: '您观看的直播已结束哦~ ',
//             2: '您观看的直播已结束哦~ ',
//             4: '您观看的直播已结束哦~ ',
//             13: '您观看的直播已结束',
//             2032: '请求视频失败，请检查网络',
//             2048: '请求m3u8文件失败，可能是网络错误或者跨域问题',
//         },
//     });
//     player.setRenderView({ elementID: 'playerView' });
//     return player;
// };

// const player = createInstance();
// const flv = `https://live.thesaracen.com/${data?.getStreamKey?.streamKey.split('?').join('.flv?')}`;
// const url = `https://flv=${encodeURIComponent(flv)}`;

// if (ref.current.childNodes.length < 1) {
//     player
//         .startPlay(url)
//         .then(() => {
//             console.log('player | startPlay | ok');
//         })
//         .catch((error: any) => {
//             console.error('player | startPlay | failed', error);
//         });
// }
// console.log(player);
import flvjs from 'flv.js';
// import { Events } from 'flv.js/d.ts/flv';
const createPlayer = (mediaDataSource: { type: string; url: string }) => {
    return flvjs.createPlayer(mediaDataSource, {
        lazyLoad: true,
        lazyLoadMaxDuration: 3 * 60,
        lazyLoadRecoverDuration: 30,
        enableStashBuffer: false,
        deferLoadAfterSourceOpen: true,
        autoCleanupSourceBuffer: true,
        seekType: 'range',
        fixAudioTimestampGap: false,
    });
};
export const flvLoadMds = (mediaDataSource: { type: string; url: string }, player: any, ref: any) => {
    // console.log(typeof player, player);
    if (typeof player !== 'undefined') {
        if (player != null) {
            player.unload();
            player.detachMediaElement();
            player.destroy();
            player = null;
        }
    }
    player = createPlayer(mediaDataSource);
    player?.attachMediaElement(ref?.current);
    player?.load();

    player?.on(flvjs.Events.SCRIPTDATA_ARRIVED, (e: any) => {
        console.log('완료!!!!!!!!!!!!!', e);
        const dim: HTMLDivElement | null = document.querySelector('.dimmed');
        const playerImg: HTMLDivElement | null = document.querySelector('.player');
        if (dim && playerImg) {
            playerImg.style.zIndex = '0';
            dim.style.display = 'none';
        } else {
            player.play();
        }
    });
    // player?.on(flvjs.Events.MEDIA_INFO, (e: any) => {
    //     console.log('MEDIA_INFO!!!!!!!!!!!!!!!!!!!!!!!!', e);
    // });
    player?.on(flvjs.Events.LOADING_COMPLETE, (e: any) => {
        console.log('LOADING_COMPLETE!!!!!!!!!!!!!!!!!!!!!!!!', e);
        const dim: HTMLDivElement | null = document.querySelector('.dimmed');
        const playerImg: HTMLDivElement | null = document.querySelector('.player');
        player.unload();
        if (dim && playerImg) {
            // isLiveInVar(false);
            playerImg.style.zIndex = '10';
            dim.style.display = 'block';
        } else {
            ref.current.style.display = 'none';
        }
    });
    // player?.on(flvjs.Events.METADATA_ARRIVED, (e: any) => {
    //     console.log('METADATA_ARRIVED!!!!!!!!!!!!!!!!!!!!!!!!', e);
    // });
    // player?.on(flvjs.Events.RECOVERED_EARLY_EOF, (e: any) => {
    //     console.log('RECOVERED_EARLY_EOF!!!!!!!!!!!!!!!!!!!!!!!!', e);
    // });
    let decodedFrames = 0;
    player?.on(flvjs.Events.STATISTICS_INFO, async (e: any) => {
        // console.log('STATISTICS_INFO!!!!!!!!!!!!!!!!!!!!!!!!', e);
        console.log(decodedFrames, e.decodedFrames);
        if (decodedFrames === e.decodedFrames) {
            await flvDestroy(player);
            player = await createPlayer(mediaDataSource);
            player?.attachMediaElement(ref?.current);
            player?.load();
            return;
        }
        decodedFrames = e.decodedFrames;
        if (decodedFrames === 0) {
            // await player.pause();
            // await player.unload();
            // // await player?.attachMediaElement(ref.current);
            // await player?.load();
            // await player?.play();
            await flvDestroy(player);
            player = await createPlayer(mediaDataSource);
            player?.attachMediaElement(ref?.current);
            player?.load();
        }
    });

    // console.log('flvjs feature list', flvjs.getFeatureList());
    flvjs.LoggingControl.addLogListener(async function (log) {
        // console.log(log, ' ----------- 로그');
        if (log === 'warn') {
            await player?.pause();
            await player?.unload();
            await player?.attachMediaElement(ref.current);
            await player?.load();
            await player?.play();
        }
        if (log === 'error') {
            await player.detachMediaElement();
        }
    });
    // console.log(player.buffered, player.currentTime);
    // player?.on('error', (err: any) => console.log('err', err));
    player?.on(flvjs.Events.ERROR, async (err: any) => {
        console.log(`A network error was detected on camera Attempting to restart it.`);
    });
    player.muted = true;
    // const mediaSource = new MediaSource();
    // const mimeCodec = 'video/mp4;codecs=avc1.4d401e';
    // const fetchAB = (url: string, cb: any) => {
    //     console.log(url);
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('get', url);
    //     xhr.responseType = 'arraybuffer';
    //     xhr.onload = function () {
    //         cb(xhr.response);
    //     };
    //     xhr.send();
    // };
    // const sourceOpen = (_: any) => {
    //     console.log(mediaSource.readyState); // open
    //     var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    //     fetchAB(mediaDataSource.url, function (buf: any) {
    //         sourceBuffer.addEventListener('updateend', function (_) {
    //             mediaSource.endOfStream();
    //             ref.current.play();
    //             console.log(mediaSource.readyState); // ended
    //         });
    //         sourceBuffer.appendBuffer(buf);
    //     });
    // };
    // if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    //     console.log(mediaSource.readyState); // closed
    //     ref.current.src = URL.createObjectURL(mediaSource);
    //     mediaSource.addEventListener('sourceopen', sourceOpen);
    // } else {
    //     console.error('Unsupported MIME type or codec: ', mimeCodec);
    // }
    return player;
};
export const flvLoad = (streamKey: string, player: any, ref: any) => {
    console.log('isSupported: ' + flvjs.isSupported(), streamKey);
    const mediaDataSource = {
        type: 'flv',
        url: `https://live.thesaracen.com/${streamKey.split('?').join('.flv?')}`,
        fluid: true,
        isLive: true,
    };
    return flvLoadMds(mediaDataSource, player, ref);
};

export const flvDestroy = (player: any) => {
    if (player) {
        console.log(player);
        if (player._mediaInfo) {
        }
        player.unload();
        player.detachMediaElement();
        player.destroy();
        player = null;
        console.log('파괴!!');
        return player;
    }
    console.log('에러', player);
};
