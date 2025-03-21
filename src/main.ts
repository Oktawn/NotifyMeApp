import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.get('PORT') || 3000;
  await app.listen(port).then(() => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
