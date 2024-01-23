import { DatabaseService } from './../../../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return await this.databaseService.medicalRecord.create({
      data: createMedicalRecordDto,
    });
  }
  async update(updateMedicalRecordDto: UpdateMedicalRecordDto, id: number) {
    return await this.databaseService.medicalRecord.update({
      data: updateMedicalRecordDto,
      where: {
        id: id,
      },
    });
  }
  async delete(id: number) {
    return await this.databaseService.medicalRecord.delete({
      where: {
        id: id,
      },
    });
  }
  async get() {
    return await this.databaseService.medicalRecord.findMany();
  }
}
