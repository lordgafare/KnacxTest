import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRecordsController } from '../medical-records.controller';
import { MedicalRecordsService } from '../medical-records.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  StatusCodeModel,
  constantMessage,
  constantService,
} from '../../../../constants/constant';
import {
  expectedMedicalRecordMock,
  mockMedicalRecords,
} from '../../../../mock/models/medical-records.model.mock';

describe('MedicalRecordsController', () => {
  let controller: MedicalRecordsController;
  let medicalRecordsService: MedicalRecordsService;

  beforeEach(async () => {
    const medicalRecordsServiceMock = {
      provide: MedicalRecordsService,
      useValue: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        get: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalRecordsController],
      providers: [medicalRecordsServiceMock],
    }).compile();

    controller = module.get<MedicalRecordsController>(MedicalRecordsController);
    medicalRecordsService = module.get<MedicalRecordsService>(
      MedicalRecordsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return success response when medical record creation is successful', async () => {
      jest
        .spyOn(medicalRecordsService, 'create')
        .mockResolvedValue(expectedMedicalRecordMock);

      const expectedResult = {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_CREATE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: expectedMedicalRecordMock,
      };

      const result = await controller.create(expectedMedicalRecordMock);
      expect(result).toEqual(expectedResult);
    });

    it('should throw HttpException when medical record creation fails', async () => {
      const errorMessage = 'Error creating medical record';
      jest
        .spyOn(medicalRecordsService, 'create')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.create(expectedMedicalRecordMock),
      ).rejects.toThrow(
        new HttpException(
          {
            status: {
              code: StatusCodeModel.SUCCESS.code,
              message: constantMessage.MEDICAL_RECORD_CREATE_FAILED,
              service: constantService.MEDICAL_RECORD_SERVICE,
              error: errorMessage,
            },
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('update', () => {
    it('should return success response when medical record update is successful', async () => {
      const medicalRecordId = 1;

      const updatedMedicalRecordMock = {
        id: medicalRecordId,
        patient_id: 123,
        date: new Date(),
        diagnosis: 'Diagnosis 1235',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest
        .spyOn(medicalRecordsService, 'update')
        .mockResolvedValue(updatedMedicalRecordMock);

      const expectedResult = {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_UPDATE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: updatedMedicalRecordMock,
      };

      const result = await controller.update(
        medicalRecordId,
        updatedMedicalRecordMock,
      );
      expect(result).toEqual(expectedResult);
      expect(medicalRecordsService.update).toHaveBeenCalledWith(
        updatedMedicalRecordMock,
        medicalRecordId,
      );
    });

    it('should throw HttpException when medical record update fails', async () => {
      const updateMedicalRecordDtoMock = {};
      const medicalRecordId = 1;
      const errorMessage = 'Error updating medical record';
      jest
        .spyOn(medicalRecordsService, 'update')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.update(medicalRecordId, updateMedicalRecordDtoMock),
      ).rejects.toThrow(
        new HttpException(
          {
            status: {
              code: StatusCodeModel.FAILED.code,
              message: constantMessage.MEDICAL_RECORD_UPDATE_FAILED,
              service: constantService.MEDICAL_RECORD_SERVICE,
              error: errorMessage,
            },
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('delete', () => {
    it('should return success response when medical record deletion is successful', async () => {
      const medicalRecordId = 1;

      jest.spyOn(medicalRecordsService, 'delete').mockResolvedValue(undefined);

      const expectedResult = {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_DELETE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: expect.any(Date),
      };

      const result = await controller.delete(medicalRecordId);
      expect(result).toEqual(expectedResult);
      expect(medicalRecordsService.delete).toHaveBeenCalledWith(
        medicalRecordId,
      );
    });

    it('should throw HttpException when medical record deletion fails', async () => {
      const medicalRecordId = 1;
      const errorMessage = 'Error deleting medical record';
      jest
        .spyOn(medicalRecordsService, 'delete')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.delete(medicalRecordId)).rejects.toThrow(
        new HttpException(
          {
            status: {
              code: StatusCodeModel.FAILED.code,
              message: constantMessage.MEDICAL_RECORD_DELETE_FAILED,
              service: constantService.MEDICAL_RECORD_SERVICE,
              error: errorMessage,
            },
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('get', () => {
    it('should return success response with all medical records', async () => {
      jest
        .spyOn(medicalRecordsService, 'get')
        .mockResolvedValue(mockMedicalRecords);

      const expectedResult = {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_GET_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: mockMedicalRecords,
      };

      const result = await controller.get();
      expect(result).toEqual(expectedResult);
      expect(medicalRecordsService.get).toHaveBeenCalled();
    });

    it('should throw HttpException when there is an error retrieving medical records', async () => {
      const errorMessage = 'Error retrieving medical records';
      jest
        .spyOn(medicalRecordsService, 'get')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.get()).rejects.toThrow(
        new HttpException(
          {
            status: {
              code: StatusCodeModel.FAILED.code,
              message: constantMessage.MEDICAL_RECORD_GET_FAILED,
              service: constantService.MEDICAL_RECORD_SERVICE,
              error: errorMessage,
            },
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
