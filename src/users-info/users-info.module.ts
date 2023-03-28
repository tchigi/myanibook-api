import { Module } from '@nestjs/common';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoService } from './users-info.service';

@Module({
  controllers: [UsersInfoController],
  providers: [UsersInfoService]
})
export class UsersInfoModule {}
