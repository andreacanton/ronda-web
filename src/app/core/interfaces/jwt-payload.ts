export interface JwtPayload {
  role: string;
  email: string;
  firstname: string;
  lastname: string;
  memberNumber: number;
  iat: number;
  exp: number;
  sub: number;
}
