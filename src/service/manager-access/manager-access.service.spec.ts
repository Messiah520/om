import { Test, TestingModule } from '@nestjs/testing';
import { ManagerAccessService } from './manager-access.service';

describe('ManagerAccessService', () => {
  let service: ManagerAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerAccessService],
    }).compile();

    service = module.get<ManagerAccessService>(ManagerAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
