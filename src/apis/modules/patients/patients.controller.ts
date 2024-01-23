import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import {
  StatusCodeModel,
  constantMessage,
  constantService,
} from '../../../constants/constant';
import { ResponseModel } from '../../../models/response/common.response';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<ResponseModel> {
    try {
      await this.patientsService.create(createPatientDto);

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.PATIENT_CREATE_SUCCESS,
          service: constantService.PATIENT_SERVICE,
        },
        data: new Date(),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: constantMessage.PATIENT_CREATE_FAILED,
            service: constantService.PATIENT_SERVICE,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @HttpCode(200)
  async get(@Param('id') id: number): Promise<ResponseModel> {
    try {
      const patient = await this.patientsService.getById(id);

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: constantMessage.PATIENT_GET_SUCCESS,
          service: constantService.PATIENT_SERVICE,
        },
        data: patient,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: constantMessage.PATIENT_GET_FAILED,
            service: constantService.PATIENT_SERVICE,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
