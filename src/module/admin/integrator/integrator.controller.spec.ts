import { Test, TestingModule } from '@nestjs/testing';
import { IntegratorController } from './integrator.controller';

describe('Integrator Controller', () => {
  let controller: IntegratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegratorController],
    }).compile();

    controller = module.get<IntegratorController>(IntegratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
