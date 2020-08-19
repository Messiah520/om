import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentRecordService } from './equipment-record.service';

describe('EquipmentRecordService', () => {
  let service: EquipmentRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentRecordService],
    }).compile();

    service = module.get<EquipmentRecordService>(EquipmentRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
