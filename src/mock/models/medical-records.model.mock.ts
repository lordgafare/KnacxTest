const createMedicalRecordDtoMock = {
  patient_id: 1,
  date: new Date(),
  diagnosis: 'Sample Diagnosis',
};

const expectedMedicalRecordMock = {
  id: 1,
  ...createMedicalRecordDtoMock,
  created_at: new Date(),
  updated_at: new Date(),
};

const mockMedicalRecords = [
  {
    id: 1,
    patient_id: 123,
    date: new Date(),
    diagnosis: 'Diagnosis 1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    patient_id: 456,
    date: new Date(),
    diagnosis: 'Diagnosis 2',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export {
  createMedicalRecordDtoMock,
  expectedMedicalRecordMock,
  mockMedicalRecords,
};
