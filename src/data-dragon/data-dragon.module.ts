import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataDragonResolver } from './data-dragon.resolver';
import { DataDragonService } from './data-dragon.service';
import { DataDragon, DataDragonSchema } from './schema/data-dragon.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataDragon.name, schema: DataDragonSchema },
    ]),
  ],
  providers: [DataDragonResolver, DataDragonService],
  exports: [DataDragonService],
})
export class DataDragonModule {}
