import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiConfigService } from './api-config.service';
import { HttpExceptionFilter } from '../common/exception-filters/http-exception-filter';

export const applyAppSettings = (app: INestApplication) => {
  // app.useGlobalInterceptors()
  // app.useGlobalGuards(new AuthGuard());
  // app.use(LoggerMiddlewareFunc);

  setAppPrefix(app);
  setSwagger(app);
  setAppPipes(app);
  setAppExceptionsFilters(app);
};

const setAppPrefix = (app: INestApplication) => {
  const apiConfig = app.get(ApiConfigService);
  app.setGlobalPrefix(apiConfig.APP_PREFIX);
};

const setSwagger = (app: INestApplication) => {
  const apiConfig = app.get(ApiConfigService);
  if (!apiConfig.isProduction) {
    const swaggerPath = apiConfig.APP_PREFIX + '/swagger-doc';

    const config = new DocumentBuilder()
      .setTitle('BLOGGER API')
      .addBearerAuth()
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPath, app, document, {
      customSiteTitle: 'Blogger Swagger',
    });
  }
};

const setAppPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const customErrors: { key: string; message?: string }[] = [];

        errors.forEach((e) => {
          const constraintKeys = Object.keys(e?.constraints ?? []);

          constraintKeys.forEach((cKey) => {
            const msg = e.constraints?.[cKey];

            customErrors.push({ key: e.property, message: msg });
          });
        });

        // Error 400
        throw new BadRequestException(customErrors);
      },
    }),
  );
};

const setAppExceptionsFilters = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
