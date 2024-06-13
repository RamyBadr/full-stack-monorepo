import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthenticationService } from "./authentication.service";
import { Auth } from "./decorators/auth.decorator";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { AuthType } from "./enums/auth-type.enum";

@ApiBearerAuth()
@ApiTags("Auth")
@Auth(AuthType.None)
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {
  }

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh-tokens")
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
