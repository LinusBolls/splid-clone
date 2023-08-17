import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {populateDbs} from "./currencies/currencies.service";

async function bootstrap() {
    populateDbs()
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));
    await app.listen(3000);
}

bootstrap();