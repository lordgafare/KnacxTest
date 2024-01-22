import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../patients.service';
import { DatabaseService } from '../../../../database/database.service';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, PatientsService],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
