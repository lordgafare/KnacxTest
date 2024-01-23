import { IsDate, IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNotEmpty()
  @IsInt()
  patient_id: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;
}
