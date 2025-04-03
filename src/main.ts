import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { setupSwagger } from "./config/swagger/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  setupSwagger(app);

  await app.listen(3000)
  console.log(`Application is running on: http://localhost:3000/`)
  console.log(`Swagger documentation is available at: http://localhost:3000/swagger`)
}
bootstrap()

