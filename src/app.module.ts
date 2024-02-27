import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiConfigService } from './settings';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './features';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development.local'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    BlogsModule,
  ],
  controllers: [],
  providers: [ApiConfigService],
})
export class AppModule {}
