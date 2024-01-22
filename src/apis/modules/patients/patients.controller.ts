import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { constantMessage, constantService } from '../../../constants/constant';
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
      const patient = await this.patientsService.create(createPatientDto);

      return {
        status: {
          code: '',
          message: constantMessage.PATIENT_CREATE_SUCCESS,
          service: constantService.PATIENT_SERVICE,
          error: '',
        },
        data: patient,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: '',
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
}
