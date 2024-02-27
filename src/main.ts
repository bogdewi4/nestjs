import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { applyAppSettings } from './settings/apply-app-setting';
import { ApiConfigService } from './settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfig = app.get(ApiConfigService);

  applyAppSettings(app);
  const port = apiConfig.APP_PORT;
  await app.listen(port, () => {
    console.log('App starting listen port: ', port);
  });
}
bootstrap();
