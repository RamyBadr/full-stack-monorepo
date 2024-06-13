import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenGuard } from "./access-token.guard";
import { AuthenticationGuard } from "./authentication.guard";

describe("AuthenticationGuard", () => {
  const jwtService = new JwtService({});
  const config = {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? "3600", 10),
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? "86400", 10)
  };
  it("should be defined", () => {
    expect(
      new AuthenticationGuard(
        new Reflector(),
        new AccessTokenGuard(jwtService, config)
      )
    ).toBeDefined();
  });
});
