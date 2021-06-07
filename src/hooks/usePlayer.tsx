import TwebLive from 'tweblive';

export const createInstance = () => {
    let player = TwebLive.createPlayer();
    player.setCustomConfig({
        autoplay: true,
        poster: {
            style: 'cover',
            src: 'https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20180302_108%2F1985wc_1519956283725wdWta_JPEG%2F2587463380360135_853222724.jpg%22&service=selective&type=f80_80_q90',
        },
        pausePosterEnabled: false,
        wording: {
            1: '您观看的直播已结束哦~ ',
            2: '您观看的直播已结束哦~ ',
            4: '您观看的直播已结束哦~ ',
            13: '您观看的直播已结束',
            2032: '请求视频失败，请检查网络',
            2048: '请求m3u8文件失败，可能是网络错误或者跨域问题',
        },
    });
    player.setRenderView({ elementID: 'playerView' });
    return player;
};

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
