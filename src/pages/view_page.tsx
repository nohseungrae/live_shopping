import { useReactiveVar } from '@apollo/client';
import React, { useEffect } from 'react';
import { isLiveInVar, isOpenedInVar } from '../apollo';
import { ViewLayout } from '../components/view/view_layout';
import { useGetStreamKey } from '../hooks/useKey';
export const ViewPage = () => {
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
                <div>
                    <button onClick={openView} className={'bg-black text-white rounded-md'}>
                        let's go to View
                    </button>
                </div>
            ) : null}
            {isOpened && isLive ? <ViewLayout /> : null}
        </>
    );
};
