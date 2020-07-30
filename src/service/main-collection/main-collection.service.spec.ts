import { Test, TestingModule } from '@nestjs/testing';
import { MainCollectionService } from './main-collection.service';

describe('MainCollectionService', () => {
  let service: MainCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainCollectionService],
    }).compile();

    service = module.get<MainCollectionService>(MainCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
