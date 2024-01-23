import { DatabaseService } from './../../../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return await this.databaseService.medicalRecord.create({
      data: createMedicalRecordDto,
    });
  }
}
