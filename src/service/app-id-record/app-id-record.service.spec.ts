import { Test, TestingModule } from '@nestjs/testing';
import { AppIdRecordService } from './app-id-record.service';

describe('AppIdRecordService', () => {
  let service: AppIdRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppIdRecordService],
    }).compile();

    service = module.get<AppIdRecordService>(AppIdRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
