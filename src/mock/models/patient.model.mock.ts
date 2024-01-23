const createPatientDtoMock = {
  email: 'test@example.com',
  password: 'password',
  first_name: 'John',
  last_name: 'Doe',
};

const expectedCreatedDataMock = {
  email: createPatientDtoMock.email,
  password: 'mocked_hashed_password',
  first_name: createPatientDtoMock.first_name,
  last_name: createPatientDtoMock.last_name,
};

const expectedPatientRecordMock = {
  id: 1,
  ...expectedCreatedDataMock,
  created_at: new Date(),
  updated_at: new Date(),
};

const medicalRecordMock = {
  id: 10,
  patient_id: 1,
  date: new Date(),
  diagnosis: 'Sample Diagnosis',
  created_at: new Date(),
  updated_at: new Date(),
};

const expectedPatientRecordGetMock = {
  id: 1,
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  password: 'mocked_hashed_password',
  created_at: new Date(),
  updated_at: new Date(),
  medical_records: [medicalRecordMock],
};

export {
  createPatientDtoMock,
  expectedCreatedDataMock,
  expectedPatientRecordMock,
  medicalRecordMock,
  expectedPatientRecordGetMock,
};
