type ValidationRules = {
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: RegExp
  }

  type ValidationErrors = {
    [key: string]: string
  }

  type ValidationResult = {
    isValid: boolean
    errors: ValidationErrors
  }

/**
 * Validates an object based on specified validation rules.
 *
 * @param {Record<string, any>} obj - The object to be validated.
 * @param {Record<string, ValidationRules>} validationRules - Validation rules for each property.
 * @returns {ValidationResult} - Returns an object with `isValid` set to `true` if the object is valid,
 *   or an object with `isValid` set to `false` and `errors` containing validation error messages.
 */
function formValidation(obj: Record<string, any>, validationRules: Record<string, ValidationRules>): ValidationResult {
  const errors: ValidationErrors = {};

  for (const key of Object.keys(validationRules)) {
    const rule = validationRules[key];
    const value = obj[key];

    if (rule.required && (value === undefined || value === null || value === '')) {
      errors[key] = 'Field is required';
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[key] = `Must be at least ${rule.minLength} characters`;
    } else if (rule.maxLength && value.length > rule.maxLength) {
      errors[key] = `Must not exceed ${rule.maxLength} characters`;
    } else if (rule.min !== undefined && value < rule.min) {
      errors[key] = `Must be at least ${rule.min}`;
    } else if (rule.max !== undefined && value > rule.max) {
      errors[key] = `Must not exceed ${rule.max}`;
    } else if (rule.pattern && !rule.pattern.test(value)) {
      errors[key] = 'Invalid format';
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

export default formValidation;
