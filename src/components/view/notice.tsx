import React from 'react';

export const Notice = () => {
    return (
        <a href={'https://thesaracen.com/'} className={`notice`} target={'_blank'} rel={'noopener noreferrer'}>
            <div
                style={{ padding: '5px 10px' }}
                onClick={(e: any) => {
                    e.stopPropagation();
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="30"
                    height="30"
                    viewBox="0 0 80 80"
                >
                    <g id="speaker">
                        <image
                            id="벡터_고급_개체"
                            data-name="벡터 고급 개체"
                            x="2"
                            y="8"
                            width="76"
                            height="65"
                            xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABBCAYAAAB7CUL1AAAFW0lEQVR4nO2cSYgcZRiGn2/SCmrU0WjcEFckJsYgRjOjIiiKK4riweXgwS0SFa+KB0+CHjwpGBAVDQh68CToJbhlZtxQXEIMEoIYCYpRXDIxOvN4qOr0TKeqp6tT1dOj9cDPQC3/9/Xb719V3f19AzWZqIerL6t71En1BfXQ+c5rYFE3uD8vxnwnNoioBwG7gUbbrr1D85BPJajD6lXq4+rb6k51Wv1OXa+eWWC6w9hfLICDS0q3v6hD6nL1bvV5dXMqTif2qLd3Of9w3iQLYkmqRwAj6RhNx5E9TDUNXB4R784Rbxj4JWvfwAmWvonLSEQZAS4CllNerpuBcyLCDjkMrmDq4bTEaf4drjjspRHxfoeccgXLurBVRuqes2gtq1FgBdDvm88lQK5gnahUsNQ9a2gtrTXA0RWG3AmMAxPAGHArsC7juON6DVCqYGrTPRdRvXv+AT4jEWccGI+I7W35XFF20J4FUxcDF9JyzwiwpKS8sviRRJixdHwaEZMVxsuka8FS98y8ra+kOvdMAZ/TWloTEbGtoliFyBRMPQy4gNnLqx/uaY5PImJ3hfF6Zp9g6hBwB3AviUCLKoo5BXxByz1jg+KebmjAvrvZ68BVFcT4iRkXZuDjiPizgjh9oemwVyhHrHb3TETEtyXMOzA01OuAG3s8/2dmiAN8FBF/lJXcINIA7uny2GngS1pLayIitlaV2KDSAC7O2beLxDWb+J+4pxsawDE5+1ZFxPf9TGYh0OnB83/vpiz+M19R94tasILUghWkFqwgtWAFqQUrSC1YQWrBClILVpBasILUghWkFqwgtWAFqQUrSC1YQWrBClILVpBasILUghWkk2An9C2LBUQD+AE4MWPf1+oWWj/SjgFbImK6j/kNHA3gXeC2jH0BnJ2Ou9Jtv6rNOokJkh9zf+tHooNCA3iWbMGyGAauTgeA6mZaLhwncWFuhfJCpxERm9T1wH09nB8kZZkraJUctLtwPCJ+LyXbAaBZvfNQ+rcX0dppd+G0+jWzC+a2LlQXNgAiYi+wVt1AItoVwPElxRgiKe9cSVKsB7BL/ZDWUv5wobhwVslmRHwAfACgnkqrnnUEOK/9+APgaOCadMBsF25igCuDcgVIS7i3A68CqIcA5wMbgFNKzmM/F6oDWXvWtWMiYlIdB47NOeQb4EzKq41dAlyXDkhcOO/1aUWX2DIgq41XkqrrKWA1s1tjlh5IgjMYAlalYy3sc2Gzdr8v9bNFBTs/Z/vWGRft99IBgHo6Sel6s/nhXMp14fXpAJhSZ9bYnpFzXs936LIE+zTvhLSkfBvJta+9B6B5Q8lb5kVZRHJzOg+4v8NxO3oNUFSwk3K2j6pPk76znSoX0yXzTjoASNuLZ7bgrKLab1I2Vjh3C/XZOdqEm3yvvqY+rK5RC/VKq4vVZ7qMVZSxLuLntjAXFeyWHpPco46pT6k3q3N+daQ+lzPXV+rn6lQPeexWV/ZTsIb6ZQ+JZrFdfVV9QF2tNtpivZdz3rp0/2L1cvVR9U315zni/ahe1uXrLK9J3uR6sxE4uei5czAJfELypD8OvAQclXHcZRHxTkZe7d2+q0gqxHcAbwHrI2JXN4lYds+3ugR4DLiT7BdVJUsj4qcqA5j0gmZ+tj2gJnmTDrjltJ6zRkne5arYGRF9+epc3Qac1rZ5SxWBlqjXqk+oG9U/5r6cdc0rpSec/zquUf+aEXtSvbLyf8OgLiL5UD1K0qYzQv4TeMepgJGI+KjE9DoH1DOAm9LYb8xbX6e6VL1BfdLkbri7C3c9Mi/JDiImjyur1QdNHjW2pSL9rW5Sb5jvHJv8C4sH93J1qESpAAAAAElFTkSuQmCC"
                        />
                    </g>
                </svg>
                <span className={'blind'}>공지사항 아이콘</span>
            </div>
            <div className={'notice_title'}>
                <p>오늘 라이브에서만 받을 수 있는 혜택! 내용 확인하기</p>
                <span className={'blind'}>공지사항</span>
            </div>
        </a>
    );
};
