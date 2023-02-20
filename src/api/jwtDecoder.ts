import jwtDecode, { JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  role: string[];
}

function getRoleFromJwt(token: string|null): string | null  {
  if (token === null) return null;
  /* console.log(token); */
  const decodedJwtToken: MyJwtPayload = jwtDecode(token);
  /* console.log(decodedJwtToken.role[0]); */
  return decodedJwtToken.role[0];
}

function getUsernameFromJwt(token: string|null): string | null | undefined{
  if (token === null) return null;
  /* console.log(token); */
  const decodedJwtToken: MyJwtPayload = jwtDecode(token);
  /* console.log(decodedJwtToken.sub); */
  return decodedJwtToken.sub;
}

function getExpirationTime(token: string | null):number | null | undefined{
  if (token === null) return null;
  const decodedJwtToken: MyJwtPayload = jwtDecode(token);
  /* console.log(decodedJwtToken); */
  return decodedJwtToken.exp;
}
export { getRoleFromJwt, getUsernameFromJwt,getExpirationTime };
