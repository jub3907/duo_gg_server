import { Global, Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { CryptService } from './crypt.service';

@Global()
@Module({
  providers: [ApiService, CryptService],
  exports: [ApiService, CryptService],
})
export class CommonModule {}
