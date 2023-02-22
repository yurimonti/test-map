import {FC} from "react";

interface Props {
	color:string,
	thickness:string,
	style?:string
}

const WheelChairIcon:FC<Props> = ({color,thickness,style}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="https://sketch.io/dtd/"
      width="40"
      height="40"
      viewBox="0 0 230 224"
      className={"w-11 h-11 inline m-1 "+style}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M99.831 112.82c26.018 0 47.11 21.092 47.11 47.11s-21.092 47.11-47.11 47.11c-26.017 0-47.11-21.092-47.11-47.11s21.093-47.11 47.11-47.11zm0 44.754a2.355 2.355 0 100 4.71 2.355 2.355 0 000-4.71z"
        vectorEffect="fixed-position"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M42.54 47.5L37.61 37.31 32.76 28.25 28.03 18.11 23.02 9.11 18.2 0 0 7.96"
        transform="rotate(20.421 -315.474 497.791) scale(.97473)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M140.99 20.999c8.556-.276 15.726 6.436 16.003 15.002.276 8.555-6.447 15.726-15.002 16.002-8.566.276-15.726-6.447-16.002-15.002-.276-8.566 6.436-15.726 15.002-16.002z"
        vectorEffect="fixed-position"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M37 61L55 14 19 0 0 55"
        transform="translate(91 59)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M49 0L15 5 0 37"
        transform="translate(60 58)"
      ></path>
    </svg>
  );
}

export default WheelChairIcon;