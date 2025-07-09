(() => {
  // Type definitions
  interface KintoneFieldValue {
    value: unknown;
  }

  interface KintoneEvent {
    record: Record<string, KintoneFieldValue>;
    type?: string;
    error?: string;
  }

  declare const kintone: {
    events: {
      on: (events: string[], handler: (event: KintoneEvent) => KintoneEvent | void) => void;
    };
  }

  interface ValidationRule {
    field: string;
    rules: Array<{
      type: 'required' | 'email' | 'url' | 'number' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
      value?: number | string | RegExp;
      message: string;
      validator?: (value: unknown, record?: Record<string, { value: unknown }>) => boolean;
    }>;
  }

  interface FormValidatorConfig {
    validations: ValidationRule[];
    showErrorsInline?: boolean;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    customStyles?: {
      errorClass?: string;
      errorMessageClass?: string;
    };
  }

  const defaultConfig: FormValidatorConfig = {
    validations: [],
    showErrorsInline: true,
    validateOnChange: false,
    validateOnBlur: true,
    customStyles: {
      errorClass: 'kintoneplugin-input-error',
      errorMessageClass: 'kintoneplugin-error-message'
    }
  };

  // Validation functions
  const validators = {
    required: (value: unknown): boolean => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim().length > 0;
      return value !== null && value !== undefined;
    },
    email: (value: string): boolean => {
      if (!value) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    url: (value: string): boolean => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    number: (value: unknown): boolean => {
      if (!value && value !== 0) return true;
      return !Number.isNaN(Number(value));
    },
    minLength: (value: string, min: number): boolean => {
      if (!value) return true;
      return value.length >= min;
    },
    maxLength: (value: string, max: number): boolean => {
      if (!value) return true;
      return value.length <= max;
    },
    pattern: (value: string, pattern: RegExp | string): boolean => {
      if (!value) return true;
      const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
      return regex.test(value);
    }
  };

  // Get field element
  const getFieldElement = (fieldCode: string): HTMLElement | null => {
    const selector = `.field-${fieldCode}`;
    return document.querySelector(selector);
  };

  // Show error message
  const showError = (fieldElement: HTMLElement, message: string, config: FormValidatorConfig): void => {
    const errorClass = config.customStyles?.errorClass || 'kintoneplugin-input-error';
    const messageClass = config.customStyles?.errorMessageClass || 'kintoneplugin-error-message';

    // Add error class to input
    const input = fieldElement.querySelector('input, select, textarea');
    if (input) {
      input.classList.add(errorClass);
    }

    // Remove existing error message
    const existingError = fieldElement.querySelector(`.${messageClass}`);
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    if (config.showErrorsInline) {
      const errorDiv = document.createElement('div');
      errorDiv.className = messageClass;
      errorDiv.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 4px;';
      errorDiv.textContent = message;
      fieldElement.appendChild(errorDiv);
    }
  };

  // Clear error message
  const clearError = (fieldElement: HTMLElement, config: FormValidatorConfig): void => {
    const errorClass = config.customStyles?.errorClass || 'kintoneplugin-input-error';
    const messageClass = config.customStyles?.errorMessageClass || 'kintoneplugin-error-message';

    // Remove error class from input
    const input = fieldElement.querySelector('input, select, textarea');
    if (input) {
      input.classList.remove(errorClass);
    }

    // Remove error message
    const errorMessage = fieldElement.querySelector(`.${messageClass}`);
    if (errorMessage) {
      errorMessage.remove();
    }
  };

  // Validate single field
  const validateField = (_fieldCode: string, value: unknown, rule: ValidationRule, record: Record<string, { value: unknown }>): string | null => {
    for (const validation of rule.rules) {
      let isValid = true;

      switch (validation.type) {
        case 'required':
          isValid = validators.required(value);
          break;
        case 'email':
          isValid = validators.email(String(value));
          break;
        case 'url':
          isValid = validators.url(String(value));
          break;
        case 'number':
          isValid = validators.number(value);
          break;
        case 'minLength':
          isValid = validators.minLength(String(value), validation.value as number);
          break;
        case 'maxLength':
          isValid = validators.maxLength(String(value), validation.value as number);
          break;
        case 'pattern':
          isValid = validators.pattern(String(value), validation.value as RegExp | string);
          break;
        case 'custom':
          if (validation.validator) {
            isValid = validation.validator(value, record);
          }
          break;
      }

      if (!isValid) {
        return validation.message;
      }
    }

    return null;
  };

  // Validate all fields
  const validateAllFields = (event: KintoneEvent, config: FormValidatorConfig): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};
    const record = event.record;

    for (const validation of config.validations) {
      const fieldCode = validation.field;
      const field = record[fieldCode];
      
      if (!field) continue;

      const value = field.value;
      const error = validateField(fieldCode, value, validation, record);

      if (error) {
        errors[fieldCode] = error;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  // Setup field listeners
  const setupFieldListeners = (event: KintoneEvent, config: FormValidatorConfig): void => {
    const record = event.record;

    for (const validation of config.validations) {
      const fieldCode = validation.field;
      const fieldElement = getFieldElement(fieldCode);
      
      if (!fieldElement) continue;

      const input = fieldElement.querySelector('input, select, textarea') as HTMLInputElement;
      if (!input) continue;

      // Change event
      if (config.validateOnChange) {
        input.addEventListener('input', () => {
          const value = input.value;
          const error = validateField(fieldCode, value, validation, record);

          if (error) {
            showError(fieldElement, error, config);
          } else {
            clearError(fieldElement, config);
          }
        });
      }

      // Blur event
      if (config.validateOnBlur) {
        input.addEventListener('blur', () => {
          const value = input.value;
          const error = validateField(fieldCode, value, validation, record);

          if (error) {
            showError(fieldElement, error, config);
          } else {
            clearError(fieldElement, config);
          }
        });
      }
    }
  };

  // Main initialization
  const init = (event: KintoneEvent, config: FormValidatorConfig = defaultConfig): KintoneEvent => {
    // Merge configs
    const mergedConfig = { ...defaultConfig, ...config };

    // Setup field listeners for real-time validation
    setupFieldListeners(event, mergedConfig);

    return event;
  };

  // Submit validation
  const validateOnSubmit = (event: KintoneEvent & { error?: string }, config: FormValidatorConfig = defaultConfig): KintoneEvent => {
    const mergedConfig = { ...defaultConfig, ...config };
    const { isValid, errors } = validateAllFields(event, mergedConfig);

    if (!isValid) {
      // Show errors for all invalid fields
      for (const [fieldCode, error] of Object.entries(errors)) {
        const fieldElement = getFieldElement(fieldCode);
        if (fieldElement) {
          showError(fieldElement, error, mergedConfig);
        }
      }

      // Return error to prevent submission
      event.error = Object.values(errors).join('\n');
    }

    return event;
  };

  // Expose to global scope for manual initialization
  const k5eFormValidator = {
    init,
    validateOnSubmit,
    validateField,
    validateAllFields
  };

  if (typeof window !== 'undefined') {
    (window as Window & { k5eFormValidator?: typeof k5eFormValidator }).k5eFormValidator = k5eFormValidator;
  }

  // Auto-register events
  kintone.events.on([
    'app.record.create.show',
    'app.record.edit.show'
  ], (event) => init(event));

  kintone.events.on([
    'app.record.create.submit',
    'app.record.edit.submit'
  ], (event) => validateOnSubmit(event));

})();