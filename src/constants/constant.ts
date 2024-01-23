const StatusCodeModel = {
  SUCCESS: { code: '0000', message: 'Success' },
  FAILED: { code: '0001', message: 'Failed' },
  NOT_FOUND: { code: '0002', message: 'Not Found' },
  DUPLICATE: { code: '0003', message: 'Duplicate' },
  INVALID: { code: '0004', message: 'Invalid' },
};

const constantService = {
  PATIENT_SERVICE: 'patient-service',
  MEDICAL_RECORD_SERVICE: 'medical-record-service',
};

const constantMessage = {
  PATIENT_NOT_FOUND: 'Patient not found',
  PATIENT_ALREADY_EXISTS: 'Patient already exists',
  PATIENT_CREATE_SUCCESS: 'Create patient success',
  PATIENT_CREATE_FAILED: 'Create patient failed',
  PATIENT_GET_SUCCESS: 'Get patient success',
  PATIENT_GET_FAILED: 'Get patient failed',
  MEDICAL_RECORD_NOT_FOUND: 'Medical record not found',
  MEDICAL_RECORD_ALREADY_EXISTS: 'Medical record already exists',
  MEDICAL_RECORD_CREATE_SUCCESS: 'Create medical record success',
  MEDICAL_RECORD_CREATE_FAILED: 'Create medical record failed',
  MEDICAL_RECORD_UPDATE_SUCCESS: 'Update medical record success',
  MEDICAL_RECORD_UPDATE_FAILED: 'Update medical record failed',
  MEDICAL_RECORD_DELETE_SUCCESS: 'Delete medical record success',
  MEDICAL_RECORD_DELETE_FAILED: 'Delete medical record failed',
  MEDICAL_RECORD_GET_SUCCESS: 'Get medical record success',
  MEDICAL_RECORD_GET_FAILED: 'Get medical record failed',
};

export { constantService, constantMessage, StatusCodeModel };
