import { Test, TestingModule } from '@nestjs/testing';
import { MainCollectionController } from './main-collection.controller';

describe('MainCollection Controller', () => {
  let controller: MainCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainCollectionController],
    }).compile();

    controller = module.get<MainCollectionController>(MainCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
