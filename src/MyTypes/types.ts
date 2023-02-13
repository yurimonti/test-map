import { RouteComponentProps } from "react-router";

interface NavigateProps extends RouteComponentProps<{}>{}

interface UserCredentials{
  username: string,
  password : string
}

interface Coordinate{
  id:number
  lat:number,
  lon:number
}

interface POI{
  id:number,
  name:string,
  description:string,
  coordinate: Coordinate
}
  
  // 👇️ named export
  export type {POI,Coordinate, NavigateProps, UserCredentials };