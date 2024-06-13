import { INestApplication, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";

function initSwagger(app: INestApplication<any>) {
  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Nest js auth app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  return SwaggerModule.createDocument(app, options);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.BE_PORT || 3000;
  const document = initSwagger(app);
  const swaggerPath = 'docs';
  SwaggerModule.setup(swaggerPath, app, document);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🚀 Swagger documentation available on: http://localhost:${port}/${swaggerPath}`
  );
}

bootstrap();
