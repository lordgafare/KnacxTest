import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../../../database/database.service';
import { PatientsService } from '../patients.service';
import {
  createPatientDtoMock,
  expectedCreatedDataMock,
  expectedPatientRecordGetMock,
  expectedPatientRecordMock,
} from '../../../../mock/models/patient.model.mock';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('mocked_hashed_password'),
}));

describe('PatientsService', () => {
  let service: PatientsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: DatabaseService,
          useValue: {
            patient: {
              findFirst: jest.fn().mockImplementation((options) => options),
              create: jest.fn().mockImplementation((dto) => dto),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new patient record and return it', async () => {
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementationOnce(() =>
          Promise.resolve(expectedCreatedDataMock.password),
        );
      jest
        .spyOn(databaseService.patient, 'create')
        .mockResolvedValue(expectedPatientRecordMock);

      const result = await service.create(createPatientDtoMock);

      expect(databaseService.patient.create).toHaveBeenCalledWith({
        data: expectedCreatedDataMock,
      });

      expect(result).toEqual(expectedPatientRecordMock);
    });
  });

  describe('getById', () => {
    it('should return a patient record by id', async () => {
      jest
        .spyOn(databaseService.patient, 'findFirst')
        .mockResolvedValue(expectedPatientRecordGetMock);

      const result = await service.getById(1);

      expect(databaseService.patient.findFirst).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        include: {
          medical_records: true,
        },
      });
      expect(result).toEqual(expectedPatientRecordGetMock);
    });
  });
});
