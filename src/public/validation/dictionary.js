export const validationDictionary = {
  bool: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
  },

  day: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: '^Must be valid',
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

  generic: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
  },

  role: {
    presence: {
      allowEmpty: false,
      message: '^Role is required',
    },
  },

  username: {
    presence: {
      allowEmpty: false,
      message: '^Username is required',
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

  month: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 12,
      message: '^Must be valid',
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

  password2: {
    presence: {
      allowEmpty: false,
      message: '^Password is required',
    },
  },

  passwordConfirmation: {
    presence: {
      allowEmpty: false,
      message: '^Password confirmation is required',
    },
    // equality: 'password',
    // equality: {
    //   attribute: 'password',
    //   message: '^Password not match',
    //   comparator: function(v1, v2) {
    //     return v1 === v2;
    //   },
    // },
  },

  phone: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    format: {
      pattern: /^[2-9]\d{2}-\d{3}-\d{4}$/,
      message: '^Phone number must be valid',
    },
  },

  state: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    inclusion: {
      within: [
        'AK',
        'AL',
        'AR',
        'AZ',
        'CA',
        'CO',
        'CT',
        'DC',
        'DE',
        'FL',
        'GA',
        'HI',
        'IA',
        'ID',
        'IL',
        'IN',
        'KS',
        'KY',
        'LA',
        'MA',
        'MD',
        'ME',
        'MI',
        'MN',
        'MO',
        'MS',
        'MT',
        'NC',
        'ND',
        'NE',
        'NH',
        'NJ',
        'NM',
        'NV',
        'NY',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VA',
        'VT',
        'WA',
        'WI',
        'WV',
        'WY',
      ],
      message: '^Must be valid',
    },
  },

  zip: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    length: {
      is: 5,
      message: '^Zip must be 5 digits long',
    },
  },
};
