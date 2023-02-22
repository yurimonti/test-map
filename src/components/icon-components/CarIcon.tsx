import {FC} from "react";

interface Props {
	color:string,
	thickness:string,
	style?:string
}

const CarIcon:FC<Props> = ({ color, thickness, style }) => {
return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="https://sketch.io/dtd/"
      width="40"
      height="40"
      viewBox="0 0 380 280"
      className={"w-11 h-11 inline m-1 " + style}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M0 116L1 66 28.94 32 85 1 210.39 0 270.52 46 344 69 346.16 115"
        transform="matrix(.95426 0 0 1 26.211 77)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M60.106 181.889c3.872-13.554 18.004-21.405 31.558-17.533 13.554 3.873 21.405 18.005 17.533 31.559-3.873 13.554-18.005 21.405-31.559 17.532-13.554-3.872-21.405-18.004-17.532-31.558zM263.606 181.889c3.872-13.554 18.004-21.405 31.558-17.533 13.554 3.873 21.405 18.005 17.533 31.559-3.873 13.554-18.005 21.405-31.559 17.532-13.554-3.872-21.405-18.004-17.532-31.558z"
        vectorEffect="fixed-position"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M0 0L29 1"
        transform="translate(26 194)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M141 1L0 0"
        transform="translate(116 195.5)"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M54 0L0 2 54 0"
        transform="matrix(.82716 0 0 1 315.926 192)"
      ></path>
    </svg>
  );
  }

export default CarIcon;