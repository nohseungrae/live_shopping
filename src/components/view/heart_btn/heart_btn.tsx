import React, { useRef } from "react";
import { AnimationBox } from "./animation_box";
import HeartOnIcon from "../../../icons/ico_heart_on.png";

export const HeartBtn = () => {
  const icon = useRef<HTMLButtonElement>(null);
  const aniField = useRef(null);
  const handleAddHeart = (e: any) => {
    e.stopPropagation();
    const { target } = e;
    const heartBtn = target.parentElement;
    let cloneIcon = target.cloneNode();

    // cloneIcon.classList.add("animation-icon");
    // target.setAttribute("src", HeartOnIcon);
    // cloneIcon.setAttribute("src", HeartOnIcon);

    // heartBtn.insertAdjacentElement("beforeend", cloneIcon);

    // setTimeout(function () {
    //   cloneIcon.classList.add("animate");
    //   cloneIcon.style.left = 80 * Math.random() + "px";
    // }, 50);

    // setTimeout(() => cloneIcon.parentNode.removeChild(cloneIcon), 600);

    icon.current?.classList.add("animate-heart");
    setTimeout(() => {
      icon.current?.classList.remove("animate-heart");
    }, 200);

    // TODO : Rest JS로 하트 하기
  };
  const onClick = (e: any) => {
    e.stopPropagation();
    icon.current?.classList.add("animate-heart");
    setTimeout(() => {
      icon.current?.classList.remove("animate-heart");
    }, 200);
  };
  return (
    <button
      onClick={handleAddHeart}
      className={"btn"}
      style={{ bottom: "120px" }}
    >
      <span className={"animation_field"}>
        <AnimationBox />
      </span>
      <span className={"btn_heart_inner"} ref={icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
        >
          <defs>
            <style></style>
          </defs>
          <g>
            <g id="그룹_2" data-name="그룹 2">
              <circle id="타원_1" data-name="타원 1" cx="40" cy="40" r="40" />
              <image
                id="벡터_고급_개체"
                data-name="벡터 고급 개체"
                x="20"
                y="23"
                width="40"
                height="34"
                xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiCAYAAAAtZZsLAAACh0lEQVRYhc3YMYgUVxjA8d8+jWhlm0rsRFCjkGtEGwdBVHgepAohFiKYRkgKbRQDuULFwkJQLlgoYnFckSmUQJikUESxUE8lWAgiCBZaiAiScGOKeevd7a67jru58d/s7Mx73/dnZnjzvq+lB2WRr8IB7MJafIFXeIQ/cTlk8X6vuR+iLPL1+BbbsAYr8S/+xhWcC1l82jmv1RGkhUP4GcsH5PwDh0MW7wwQ24QT2D4g3tuU92TI4rsuwbLIAy7guwGB5jOLCfwSsjjbIbYER3EES2rEvIS9IYslhHkXJmrKSYmPYaos8hXz5FZgKl2rIyc5TLT/tFLAzbiu45HX5Dd8k46nsWeIWO+wJWTxxtJ04tSQcpLQsXnHw9BSOW1ulUX+NW4PGbBNmX5D31Efz9hSjI8oGKMTazMesHXEQUfJ1oB1TVv0YV1QreifKyuD0b83oyQEvGzaog8vA541bdGHZwEzTVv0YSbgZtMWfbgZVHuxz5UrIWTxCa41bdKDayGLT9pLzJlGVXpzhrk1cBoPmnPp4oHKqRJMu9eDTRp1cLBrRx2y+BcmG1OaYzK5oPsz9xMeLq7PAh4mh/csEAxZfIOIF4so1eYFYnKYc+ocFbL4GLvxepHEpFy7U+6FPr1GhyzeUtUViyH5GntSzi76Fkqp6L6KL/8HMXiOnf2K/4GVXFnkq/G7ql0xSh5hR/qSfZCBm9UUYExaOEfENMYGyVGzFi6L/Eccx7JP8/KPqp9z+mMn1C7WyyLfiItYX3PqfXwfsni3zqTa9UhKMKa6k7MDhktjjqseaS05hmx3lEX+FX5VCffiNvaHLN771BzD9mPabbZ9+AEb0ukZnMX5zrZcXf4DFGSfOaHbeBgAAAAASUVORK5CYII="
              />
            </g>
          </g>
        </svg>
      </span>
      <span className={"blind"}>좋아요</span>
    </button>
  );
};
