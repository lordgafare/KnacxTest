import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import {
  StatusCodeModel,
  constantMessage,
  constantService,
} from '../../../constants/constant';
import { ResponseModel } from 'src/models/response/common.response';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<ResponseModel> {
    try {
      const medicalRecord = await this.medicalRecordsService.create(
        createMedicalRecordDto,
      );

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_CREATE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: medicalRecord,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.SUCCESS.code,
            message: constantMessage.MEDICAL_RECORD_CREATE_FAILED,
            service: constantService.MEDICAL_RECORD_SERVICE,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<ResponseModel> {
    try {
      const medicalRecord = await this.medicalRecordsService.update(
        updateMedicalRecordDto,
        id,
      );

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_UPDATE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: medicalRecord,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: constantMessage.MEDICAL_RECORD_UPDATE_FAILED,
            service: constantService.MEDICAL_RECORD_SERVICE,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: number): Promise<ResponseModel> {
    try {
      await this.medicalRecordsService.delete(id);
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_DELETE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: new Date(),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: constantMessage.MEDICAL_RECORD_DELETE_FAILED,
            service: constantService.MEDICAL_RECORD_SERVICE,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(200)
  async get(): Promise<ResponseModel> {
    try {
      const data = await this.medicalRecordsService.get();
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.MEDICAL_RECORD_GET_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
        },
        data: data,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: constantMessage.MEDICAL_RECORD_GET_FAILED,
            service: constantService.MEDICAL_RECORD_SERVICE,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
