import { ZodIssue } from 'zod';

// Utility function for mapping zod's array of issues
// Returns an object
const getValidationErrors = (errorsArray: ZodIssue[]) => {
  const fieldErrors: { [key: string]: string } = {};
  errorsArray.forEach((err) => {
    const fieldName = err.path[0];
    const errorMessage = err.message;

    if (!fieldErrors[fieldName]) {
      fieldErrors[fieldName] = errorMessage;
    }
  });
  return fieldErrors;
};

export default getValidationErrors;
