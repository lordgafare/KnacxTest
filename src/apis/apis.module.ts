import { Module } from '@nestjs/common';
import { PatientsModule } from './modules/patients/patients.module';
import { MedicalRecordsModule } from './modules/medical-records/medical-records.module';

@Module({
  imports: [PatientsModule, MedicalRecordsModule],
})
export class ApisModule {}
