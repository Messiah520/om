import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisingController } from './advertising.controller';

describe('Advertising Controller', () => {
  let controller: AdvertisingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertisingController],
    }).compile();

    controller = module.get<AdvertisingController>(AdvertisingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
