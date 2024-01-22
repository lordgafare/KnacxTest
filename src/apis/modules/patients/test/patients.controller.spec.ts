import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../patients.controller';
import { PatientsService } from '../patients.service';
import { DatabaseService } from '../../../../database/database.service';

describe('PatientsController', () => {
  let controller: PatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [DatabaseService, PatientsService],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
