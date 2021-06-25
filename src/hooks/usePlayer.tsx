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
export const createPlayer = (mediaDataSource: { type: string; url: string }) => {
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
    if (typeof player !== 'undefined') {
        console.log('1. load시 플레이어가 초기화 되어 있지 않고 무언가 존재하면 null로 초기화');
        if (player != null) {
            player?.unload();
            if (player._mediaDataSource) {
                player?.detachMediaElement();
                player?.destroy();
            }
            player = null;
        }
    }
    console.log('2. 초기화되어 있는 플레이어를 새로 생성');
    player = createPlayer(mediaDataSource);
    player?.attachMediaElement(ref?.current);
    player?.load();
    player.muted = true;
    const parsingUrl = player._mediaElement.src;
    console.log(`3. ${parsingUrl} 플레이어의 src`);
    player?.on(flvjs.Events.SCRIPTDATA_ARRIVED, async (e: any) => {
        const dim: HTMLDivElement | null = document.querySelector('.dimmed');
        const playerImg: HTMLDivElement | null = document.querySelector('.player');

        console.log(`4. SCRIPTDATA_ARRIVED - 플레이 시작 가능`);
        console.log(player, dim, playerImg);
        if (dim && playerImg) {
            playerImg.style.zIndex = '0';
            dim.style.display = 'none';
        }
    });
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
    let decodedFrames = 0;
    player?.on(flvjs.Events.STATISTICS_INFO, async (e: any) => {
        // console.log('STATISTICS_INFO!!!!!!!!!!!!!!!!!!!!!!!!', e, player);
        if (decodedFrames === e.decodedFrames && !player._mediaDataSource) {
            console.log('상태체크 중 decodedFrames === e.decodedFrames', player);
            await player.unload();
            await player.detachMediaElement();
            await player.destroy();
            player = null;
            player = await createPlayer(mediaDataSource);
            await player?.attachMediaElement(ref?.current);
            await player?.load();
            return player;
        }
        decodedFrames = e.decodedFrames;

        // console.log(e.decodedFrames, player, parsingUrl, ref.current.src);
        if (parsingUrl !== ref.current.src) {
            console.log('여기 에러있어요!!!!!!!!!!!!!!!!!!');
            // await player?.unload();
            // await player?.detachMediaElement();
            // await player?.destroy();
            // player = null;
            // player = await createPlayer(mediaDataSource);
            // await player?.attachMediaElement(ref?.current);
            // await player?.load();
            // return player;
        }
        // if (e.decodedFrames === 0) {
        //     console.log('e.decodedFrames === 0', player);
        //     await player.unload();
        //     await player.detachMediaElement();
        //     await player.destroy();
        //     player = null;
        //     player = await createPlayer(mediaDataSource);
        //     await player?.attachMediaElement(ref?.current);
        //     await player?.load();
        //     return player;
        // }
    });
    flvjs?.LoggingControl.addLogListener(async function (log) {
        // if (log === 'warn') {
        //     console.log(log, ' ----------- 로그warn', player._mediaDataSource);
        //     if (player._mediaDataSource) {
        //         await player?.unload();
        //         await player?.attachMediaElement(ref.current);
        //         await player?.load();
        //         await player?.play();
        //         return;
        //     }
        //     await player?.unload();
        //     await player?.attachMediaElement(ref.current);
        //     await player?.load();
        //     await player?.play();
        // }
        if (log === 'error') {
            console.log(log, ' ----------- 로그error', player);
            await player?.unload();
            await player?.detachMediaElement();
            await player?.destroy();
            player = null;
        }
    });
    player?.on(flvjs.Events.ERROR, async (err: any) => {
        console.log(`네트워크 에러가 감지되어 재시작을 합니다.`);
        player = await createPlayer(mediaDataSource);
        await player?.attachMediaElement(ref?.current);
        await player?.load();
    });
    return player;
};
export const flvLoad = (streamKey: string, player: any, ref: any) => {
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
        player.unload();
        player.detachMediaElement();
        player.destroy();
        player = null;
        console.log('파괴!!');
        return player;
    }
    console.log('에러', player);
};
