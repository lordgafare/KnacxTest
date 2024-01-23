import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { constantMessage, constantService } from 'src/constants/constant';
import { ResponseModel } from 'src/models/response/common.response';

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
          code: '',
          message: constantMessage.MEDICAL_RECORD_CREATE_SUCCESS,
          service: constantService.MEDICAL_RECORD_SERVICE,
          error: '',
        },
        data: medicalRecord,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: '',
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
}
