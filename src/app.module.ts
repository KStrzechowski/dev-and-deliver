import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name) => name.replace('.config', ''),
      },
    ),
  ],
})
export class AppModule {}
