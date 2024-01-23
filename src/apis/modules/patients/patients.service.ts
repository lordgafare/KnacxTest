import { DatabaseService } from './../../../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPatientDto: CreatePatientDto) {
    const { email, password, first_name, last_name } = createPatientDto;
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.databaseService.patient.create({
      data: {
        email: email,
        password: hashPassword,
        first_name: first_name,
        last_name: last_name,
      },
    });
  }

  async getById(id: number) {
    return await this.databaseService.patient.findFirst({
      where: {
        id: id,
      },
      include: {
        medical_records: true,
      },
    });
  }
}
