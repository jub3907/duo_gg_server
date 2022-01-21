import { Global, Module } from '@nestjs/common';
import { ApiService } from './api/api.service';

@Global()
@Module({
  providers: [ApiService],
  exports: [ApiService],
})
export class CommonModule {}
