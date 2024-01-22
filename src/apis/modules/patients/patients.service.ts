import { DatabaseService } from './../../../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPatientDto: CreatePatientDto) {
    return await this.databaseService.patient.create({
      data: createPatientDto,
    });
  }
}
