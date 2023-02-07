import { Module } from '@nestjs/common';
import { PrismaConfig } from '@config/prisma/prisma.client';

const configs = [PrismaConfig];
const providers = [PrismaConfig];

@Module({
  providers: [...providers],
  exports: [...configs],
})
export class ConfigurationModule {}
