const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate, duplicateKeyError } = require('./plugins');
const { roles } = require('../config/roles');

const educationSchema = mongoose.Schema(
  {
    school: {
      type: String,
    },
    degree: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    major: {
      type: String,
    },
  },
  { _id: false }
);

const experienceSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  { _id: false }
);

const portfolioSchema = mongoose.Schema(
  {
    palette: {
      type: String,
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enums: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    _id: false,
  }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    initialType: {
      type: String,
      enum: ['individual', 'organization'],
      default: 'individual',
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      default: 'email',
    },
    dob: {
      type: Date,
    },
    skills: {
      type: [String],
    },
    tools: {
      type: [String],
    },
    bio: {
      type: String,
    },
    resume: {
      type: String,
    },
    refDoc: {
      type: String,
    },
    status: {
      type: String,
      default: 'unavailable',
      enum: ['unavailable', 'open-to-job'],
    },
    oneLiner: {
      type: String,
    },
    education: {
      type: [educationSchema],
    },
    experiences: {
      type: [experienceSchema],
    },
    gender: {
      type: String,
    },
    location: {
      type: String,
    },
    badges: {
      type: [String],
    },
    links: {
      type: [
        {
          label: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
    },
    org: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Organization',
    },
    customerId: {
      type: String,
    },
    portfolioDomain: {
      type: String,
      unique: true,
    },
    portfolio: {
      type: portfolioSchema,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(duplicateKeyError);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  if (user.password === undefined) {
    return false;
  }

  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
