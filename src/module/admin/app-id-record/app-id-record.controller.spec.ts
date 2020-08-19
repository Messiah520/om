import { Test, TestingModule } from '@nestjs/testing';
import { AppIdRecordController } from './app-id-record.controller';

describe('AppIdRecord Controller', () => {
  let controller: AppIdRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppIdRecordController],
    }).compile();

    controller = module.get<AppIdRecordController>(AppIdRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
