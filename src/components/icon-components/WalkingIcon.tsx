import {FC} from "react";

interface Props {
	color:string,
	thickness:string,
	style?:string
}

const WalkingIcon:FC<Props> = ({ color, thickness, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="https://sketch.io/dtd/"
      width="40"
      height="40"
      viewBox="0 0 238 250"
      className={"w-11 h-11 inline m-1 " + style}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M0 0L18 21 70 34"
        transform="translate(116 82)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M0 0L0 71 41 99 49 130"
        transform="translate(113 81)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M30 0L32 33 0 55"
        transform="translate(83 157)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M59 0L30 2 0 48"
        transform="translate(52.5 81)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M115.903 29.802c10.44-.884 19.616 6.858 20.501 17.304.885 10.439-6.858 19.616-17.297 20.5-10.446.886-19.622-6.857-20.507-17.296-.885-10.446 6.858-19.622 17.303-20.508z"
        vectorEffect="fixed-position"
      ></path>
    </svg>
  );
}

export default WalkingIcon;