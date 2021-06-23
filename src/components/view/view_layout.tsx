import React, { RefObject, useEffect } from 'react';
import { useRef } from 'react';
import { ViewContainer } from './view_container';

export const ViewLayout = () => {
    // const el: RefObject<any> = useRef(null);
    // useEffect(() => {
    //     const onWheel = (e: any) => {
    //         console.log(e, 'live wheel 작동');
    //         e.preventDefault();
    //     };
    //     if (el.current) {
    //         el.current.addEventListener('wheel', onWheel);
    //     }
    //     return () => {
    //         if (el.current) {
    //             el.current.removeEventListener('wheel', onWheel);
    //         }
    //     };
    // }, []);
    window.localStorage.setItem('wheel', 'false');
    return (
        <div className={'view'}>
            <ViewContainer />
        </div>
    );
};
