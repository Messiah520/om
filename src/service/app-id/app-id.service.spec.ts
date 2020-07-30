import { Test, TestingModule } from '@nestjs/testing';
import { AppIdService } from './app-id.service';

describe('AppIdService', () => {
  let service: AppIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppIdService],
    }).compile();

    service = module.get<AppIdService>(AppIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
