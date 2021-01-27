import { Test, TestingModule } from '@nestjs/testing';
import { RedbrockerController } from './redbrocker.controller';
import { RedbrockerService } from './redbrocker.service';

describe('RedbrockerController', () => {
  let redbrockerController: RedbrockerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RedbrockerController],
      providers: [RedbrockerService],
    }).compile();

    redbrockerController = app.get<RedbrockerController>(RedbrockerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(redbrockerController.getHello()).toBe('Hello World!');
    });
  });
});
