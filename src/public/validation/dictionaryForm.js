export const validationDictionary = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^Name required',
    },
  },

  expectedSalary: {
    presence: {
      allowEmpty: false,
      message: '^Salary is required',
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: '^Must be a number',
    },
  },

  description: {
    presence: {
      allowEmpty: false,
      message: '^Description is required',
    },
  },

  skills: {
    presence: {
      allowEmpty: false,
      message: '^Skills is required',
    },
  },

  specialist: {
    presence: {
      allowEmpty: false,
      message: '^Specialist is required',
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    email: {
      message: '^Email address must be valid',
    },
  },

  location: {
    presence: {
      allowEmpty: false,
      message: '^Location is required',
    },
  },

  date_of_birth: {
    presence: {
      allowEmpty: false,
      message: '^Date of Birth is required',
    },
  },

  integer: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: '^Must be valid',
    },
  },

  phone: {
    presence: {
      allowEmpty: false,
      message: '^Contact is required',
    },
    format: {
      pattern: /^[0-9]{10,12}$/,
      message: '^Phone number must be valid',
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: '^Password is required',
    },
    length: {
      minimum: 6,
      message: '^Password must be at least 6 characters long',
    },
  },
};
