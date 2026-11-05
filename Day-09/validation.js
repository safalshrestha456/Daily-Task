/**
 * Day 09: Form Handling & Regex Validation Core Library
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

// ============================================================================
// REGEX PATTERNS & VALIDATION RULES
// ============================================================================
const VALIDATION_PATTERNS = {
  // Full Name: 3-50 letters and spaces only
  fullName: /^[a-zA-Z\s]{3,50}$/,

  // Username: 3-20 characters, alphanumeric & underscore, cannot start with number
  username: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,

  // Email: Standard RFC 5322 compliant regex
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone: Nepal format (+977 98XXXXXXXX / 97XXXXXXXX) or international standard
  phone: /^(?:\+977[- ]?)?(?:98|97)\d{8}$|^\+?[1-9]\d{9,14}$/,

  // Password components for granular strength evaluation
  passwordMinLength: /.{8,}/,
  passwordUppercase: /[A-Z]/,
  passwordLowercase: /[a-z]/,
  passwordNumber: /[0-9]/,
  passwordSpecial: /[@$!%*?&#^()_+=-]/,

  // Full strict password: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
  passwordStrict: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/
};

// Error Messages mapping
const ERROR_MESSAGES = {
  fullName: {
    required: "Full name is required.",
    invalid: "Name must be 3-50 alphabetic characters."
  },
  username: {
    required: "Username is required.",
    invalid: "Username must start with a letter and contain 3-20 letters, numbers, or underscores."
  },
  email: {
    required: "Email address is required.",
    invalid: "Please enter a valid email address (e.g., name@domain.com)."
  },
  phone: {
    required: "Phone number is required.",
    invalid: "Please enter a valid phone number (e.g., +977-9812345678)."
  },
  password: {
    required: "Password is required.",
    invalid: "Password must be at least 8 chars with 1 uppercase, 1 lowercase, 1 digit, and 1 special symbol."
  },
  confirmPassword: {
    required: "Please confirm your password.",
    mismatch: "Passwords do not match."
  },
  gender: {
    required: "Please select your gender."
  },
  track: {
    required: "Please choose an internship track."
  },
  terms: {
    required: "You must accept the terms and code of conduct."
  }
};

/**
 * Validates a single field by key and value
 * @param {string} fieldKey 
 * @param {string|boolean} value 
 * @param {string} [comparisonValue] (used for confirmPassword)
 * @returns {{ isValid: boolean, message: string }}
 */
function validateField(fieldKey, value, comparisonValue = "") {
  // Trim strings
  const val = typeof value === "string" ? value.trim() : value;

  // Check required
  if (val === "" || val === null || val === undefined || val === false) {
    return {
      isValid: false,
      message: ERROR_MESSAGES[fieldKey]?.required || "This field is required."
    };
  }

  // Specific field validations
  switch (fieldKey) {
    case "fullName":
      return {
        isValid: VALIDATION_PATTERNS.fullName.test(val),
        message: VALIDATION_PATTERNS.fullName.test(val) ? "" : ERROR_MESSAGES.fullName.invalid
      };

    case "username":
      return {
        isValid: VALIDATION_PATTERNS.username.test(val),
        message: VALIDATION_PATTERNS.username.test(val) ? "" : ERROR_MESSAGES.username.invalid
      };

    case "email":
      return {
        isValid: VALIDATION_PATTERNS.email.test(val),
        message: VALIDATION_PATTERNS.email.test(val) ? "" : ERROR_MESSAGES.email.invalid
      };

    case "phone":
      return {
        isValid: VALIDATION_PATTERNS.phone.test(val.replace(/\s+/g, "")),
        message: VALIDATION_PATTERNS.phone.test(val.replace(/\s+/g, "")) ? "" : ERROR_MESSAGES.phone.invalid
      };

    case "password":
      return {
        isValid: VALIDATION_PATTERNS.passwordStrict.test(val),
        message: VALIDATION_PATTERNS.passwordStrict.test(val) ? "" : ERROR_MESSAGES.password.invalid
      };

    case "confirmPassword":
      const matches = val === comparisonValue;
      return {
        isValid: matches,
        message: matches ? "" : ERROR_MESSAGES.confirmPassword.mismatch
      };

    case "gender":
    case "track":
    case "terms":
      return { isValid: true, message: "" };

    default:
      return { isValid: true, message: "" };
  }
}

/**
 * Computes password strength on a scale of 0 to 4
 * @param {string} password 
 * @returns {{ score: number, label: string, color: string, rules: object }}
 */
function evaluatePasswordStrength(password) {
  const p = password || "";
  const rules = {
    minLength: VALIDATION_PATTERNS.passwordMinLength.test(p),
    hasUpper: VALIDATION_PATTERNS.passwordUppercase.test(p),
    hasLower: VALIDATION_PATTERNS.passwordLowercase.test(p),
    hasNumber: VALIDATION_PATTERNS.passwordNumber.test(p),
    hasSpecial: VALIDATION_PATTERNS.passwordSpecial.test(p)
  };

  const score = Object.values(rules).filter(Boolean).length;

  if (p.length === 0) {
    return { score: 0, label: "None", color: "#6B7280", rules };
  }
  if (score <= 2) {
    return { score: 1, label: "Weak", color: "#EF4444", rules };
  }
  if (score === 3 || score === 4) {
    return { score: 2, label: "Medium", color: "#F59E0B", rules };
  }
  return { score: 3, label: "Strong", color: "#10B981", rules };
}

// Export for Node testing or browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VALIDATION_PATTERNS,
    ERROR_MESSAGES,
    validateField,
    evaluatePasswordStrength
  };
}
