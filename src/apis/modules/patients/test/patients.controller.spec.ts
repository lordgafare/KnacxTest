import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../patients.controller';
import { PatientsService } from '../patients.service';
import { DatabaseService } from '../../../../database/database.service';
import {
  StatusCodeModel,
  constantMessage,
  constantService,
} from '../../../../constants/constant';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  createPatientDtoMock,
  expectedPatientRecordGetMock,
} from '../../../../mock/models/patient.model.mock';

describe('PatientsController', () => {
  let controller: PatientsController;
  let patientsService: PatientsService;

  beforeEach(async () => {
    const patientsServiceMock = {
      provide: PatientsService,
      useValue: {
        getById: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [DatabaseService, patientsServiceMock],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    patientsService = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return success response when patient creation is successful', async () => {
      const expectedResult = {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.PATIENT_CREATE_SUCCESS,
          service: constantService.PATIENT_SERVICE,
        },
        data: expect.any(Date),
      };

      jest.spyOn(patientsService, 'create').mockResolvedValue(undefined);

      const result = await controller.create(createPatientDtoMock);
      expect(result).toEqual(expectedResult);
    });

    it('should throw HttpException when patient creation fails', async () => {
      const errorMessage = 'Error creating patient';
      jest
        .spyOn(patientsService, 'create')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.create(createPatientDtoMock)).rejects.toThrow(
        new HttpException(
          {
            status: {
              code: StatusCodeModel.FAILED.code,
              message: constantMessage.PATIENT_CREATE_FAILED,
              service: constantService.PATIENT_SERVICE,
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
    it('should return success response with patient data', async () => {
      const expectedResult = {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.PATIENT_GET_SUCCESS,
          service: constantService.PATIENT_SERVICE,
        },
        data: expectedPatientRecordGetMock,
      };

      jest
        .spyOn(patientsService, 'getById')
        .mockResolvedValue(expectedPatientRecordGetMock);

      const result = await controller.get(expectedPatientRecordGetMock.id);
      expect(result).toEqual(expectedResult);
      expect(patientsService.getById).toHaveBeenCalledWith(
        expectedPatientRecordGetMock.id,
      );
    });

    it('should throw HttpException when an error occurs during data retrieval', async () => {
      const patientId = 1;
      const errorMessage = 'Error retrieving patient data';
      jest
        .spyOn(patientsService, 'getById')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.get(patientId)).rejects.toThrow(
        new HttpException(
          {
            status: {
              code: StatusCodeModel.FAILED.code,
              message: constantMessage.PATIENT_GET_FAILED,
              service: constantService.PATIENT_SERVICE,
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
