import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './settings';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development.local'],
    }),
  ],
  controllers: [],
  providers: [ApiConfigService],
})
export class AppModule {}
