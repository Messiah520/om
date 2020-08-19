import { Test, TestingModule } from '@nestjs/testing';
import { MainCollectionNumRecordService } from './main-collection-num-record.service';

describe('MainCollectionNumRecordService', () => {
  let service: MainCollectionNumRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainCollectionNumRecordService],
    }).compile();

    service = module.get<MainCollectionNumRecordService>(MainCollectionNumRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
