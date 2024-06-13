import { Controller, Get } from "@nestjs/common";
import { Auth } from "../iam/authentication/decorators/auth.decorator";
import { AuthType } from "../iam/authentication/enums/auth-type.enum";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Auth(AuthType.None)
  @Get()
  healthcheck() {
    return this.appService.getData();
  }
}
