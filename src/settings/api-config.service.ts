import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get APP_PORT() {
    return this.configService.get<string>('PORT', '5005');
  }

  get APP_PREFIX() {
    return this.configService.get<string>('APP_PREFIX', '/api');
  }

  get MONGO_CONNECTION_URI() {
    return this.configService.get<string>('MONGO_URI');
  }

  get isProduction() {
    return this.configService.get('production') === 'production';
  }

  get isDevelopment() {
    return this.configService.get('development') === 'development';
  }
}
