import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNotEmpty()
  @IsInt()
  patient_id: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  date: Date;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;
}
