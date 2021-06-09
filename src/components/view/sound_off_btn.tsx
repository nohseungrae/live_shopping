import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isFullOnInVar, isSoundOnInVar } from "../../apollo";

export const SoundOffBtn = () => {
  const isSoundOn = useReactiveVar(isSoundOnInVar);
  const isFullOn = useReactiveVar(isFullOnInVar);
  const soundOnOff = (e: any) => {
    e.stopPropagation();
    // let video: HTMLVideoElement | null = document.querySelector(
    //   ".react_player > video"
    // );
    // if (video && isSoundOn) {
    //   isSoundOnInVar(false);
    //   video.muted = true;
    // }
    // if (video && !isSoundOn) {
    //   isSoundOnInVar(true);
    //   video.muted = false;
    // }
    if (isSoundOn) {
      isSoundOnInVar(false);
    } else {
      isSoundOnInVar(true);
    }
  };
  return (
    <button
      className={`live_sound_off_btn ${isFullOn ? "invisible" : "visible"}`}
      onClick={soundOnOff}
    >
      {isSoundOn ? (
        <svg
          className={"live_icon_sound_off"}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <g id="volume">
            <image
              id="벡터_고급_개체"
              data-name="벡터 고급 개체"
              x="2"
              y="3"
              width="82"
              height="80"
              xlinkHref="data:img/png;base64,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"
            />
          </g>
        </svg>
      ) : (
        <svg
          className={"live_icon_sound_off"}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="79.987"
          height="79.987"
          viewBox="0 0 333 333"
        >
          <g id="대지_1" data-name="대지 1">
            <image
              id="벡터_고급_개체_복사"
              data-name="벡터 고급 개체 복사"
              x="7"
              y="16"
              width="327"
              height="311"
              xlinkHref="data:img/png;base64,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"
            />
          </g>
        </svg>
      )}

      <span className="blind">음소거</span>
    </button>
  );
};
