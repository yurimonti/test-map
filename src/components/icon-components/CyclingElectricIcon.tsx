import {FC} from "react";

interface Props {
	color?:string,
	thickness?:string,
	style?:string
}

const CyclingElectricIcon:FC<Props> = ({ color, thickness, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="https://sketch.io/dtd/"
      width="40"
      height="40"
      viewBox="0 0 340 340"
      className={"w-11 h-11 inline m-1 " + style}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M252.006 136.478c-36-50-57-47-57-47l-25 21c-18.67 18.67-37 34-30 39s35 59 35 59l-6 52"
      ></path>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M75.998 157.5c36.73-.276 66.722 29.27 66.998 65.998.276 36.73-29.269 66.722-65.998 66.998-36.729.276-66.722-29.269-66.998-65.998-.276-36.729 29.27-66.722 65.998-66.998zM263.998 157.5c36.73-.276 66.722 29.27 66.998 65.998.276 36.73-29.269 66.722-65.998 66.998-36.729.276-66.722-29.269-66.998-65.998-.276-36.729 29.27-66.722 65.998-66.998zM243.49 41.506c12.424 3.037 20.035 15.573 16.998 27.997-3.037 12.424-15.573 20.035-27.997 16.998-12.424-3.037-20.035-15.572-16.998-27.997 3.037-12.424 15.573-20.035 27.997-16.998z"
        vectorEffect="fixed-position"
      ></path>
    </svg>
  );
}

export default CyclingElectricIcon;