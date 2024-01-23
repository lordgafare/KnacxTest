import { DatabaseService } from '../../../../database/database.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRecordsService } from '../medical-records.service';
import {
  expectedMedicalRecordMock,
  createMedicalRecordDtoMock,
  mockMedicalRecords,
} from '../../../../mock/models/medical-records.model.mock';

describe('MedicalRecordsService', () => {
  let service: MedicalRecordsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const databaseServiceMock = {
      provide: DatabaseService,
      useValue: {
        medicalRecord: {
          create: jest.fn().mockImplementation((dto) => dto),
          update: jest.fn().mockImplementation((params) => ({
            ...params.data,
            id: params.where.id,
          })),
          delete: jest.fn().mockImplementation((params) => ({
            id: params.where.id,
          })),
          findMany: jest.fn().mockImplementation(() => mockMedicalRecords),
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalRecordsService, databaseServiceMock],
    }).compile();

    service = module.get<MedicalRecordsService>(MedicalRecordsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new medical record and return it', async () => {
      jest
        .spyOn(databaseService.medicalRecord, 'create')
        .mockResolvedValue(expectedMedicalRecordMock);

      const result = await service.create(createMedicalRecordDtoMock);

      expect(databaseService.medicalRecord.create).toHaveBeenCalledWith({
        data: createMedicalRecordDtoMock,
      });
      expect(result).toEqual(expectedMedicalRecordMock);
    });
  });

  describe('update', () => {
    it('should update an existing medical record and return it', async () => {
      const updateMedicalRecordDto = {
        diagnosis: 'Updated Diagnosis',
        date: new Date(),
      };

      const medicalRecordId = 1;

      const expectedUpdatedRecord = {
        ...updateMedicalRecordDto,
        id: medicalRecordId,
        created_at: new Date(),
        updated_at: new Date(),
        patient_id: 1,
      };

      jest
        .spyOn(databaseService.medicalRecord, 'update')
        .mockResolvedValue(expectedUpdatedRecord);

      const result = await service.update(
        updateMedicalRecordDto,
        medicalRecordId,
      );

      expect(databaseService.medicalRecord.update).toHaveBeenCalledWith({
        data: updateMedicalRecordDto,
        where: {
          id: medicalRecordId,
        },
      });
      expect(result).toEqual(expectedUpdatedRecord);
    });
  });

  describe('delete', () => {
    it('should delete a medical record and return the deleted record', async () => {
      const medicalRecordId = 1;
      const mockMedicalRecord = {
        id: 1,
        patient_id: 123,
        date: new Date(),
        diagnosis: 'Sample Diagnosis',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(databaseService.medicalRecord, 'delete')
        .mockResolvedValue(mockMedicalRecord);

      const result = await service.delete(medicalRecordId);

      expect(databaseService.medicalRecord.delete).toHaveBeenCalledWith({
        where: {
          id: medicalRecordId,
        },
      });
      expect(result).toEqual(mockMedicalRecord);
    });
  });

  describe('get', () => {
    it('should retrieve all medical records', async () => {
      jest
        .spyOn(databaseService.medicalRecord, 'findMany')
        .mockResolvedValue(mockMedicalRecords);

      const result = await service.get();

      expect(databaseService.medicalRecord.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockMedicalRecords);
    });
  });
});
