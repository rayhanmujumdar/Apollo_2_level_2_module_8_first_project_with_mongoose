import { Schema, model } from "mongoose";
// import validator from "validator";
import {
  Student,
  UserName,
  Guardian,
  LocalGuardian,
} from "./student.interface";

// name Schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    maxlength: [20, "First name must be less then 20 characters"],
    trim: true,
    required: [
      true,
      "firstName must required, not other option, you must be can get me your firstName name",
    ],
    // validate: {
    //   validator: function (val: string) {
    //     const firstName = val.charAt(0).toUpperCase() + val.slice(1);
    //     return firstName === val;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },

  middleName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    trim: true,
    // validate: {
    //   validator: (value: string) => {
    //     return validator.isAlpha(value);
    //   },
    //   message: `Last name must only contain alphabetical characters`,
    // },
    required: true,
  },
});

// guardian schema
const guardianSchema = new Schema<Guardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  relation: {
    type: String,
    enum: {
      values: ["father", "mother", "brother", "sister"],
      message: `{VALUE} is not supported`,
    },
  },
  gender: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
});

// localGuardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// student schema
const studentSchema = new Schema<Student>({
  name: {
    type: userNameSchema,
    required: [true, "name field is required"],
  },
  email: {
    type: String,
    required: [true, "Email must be required and email must be unique"],
    // validate: {
    //   validator: (value: string) => {
    //     return validator.isEmail(value);
    //   },
    //   message: `{VALUE} is not valid email`,
    // },
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: `{VALUE} is not supported`,
    },
  },
  contactNo: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  isActive: {
    type: String,
    default: "active",
    enum: {
      values: ["active", "block"],
      message: `{VALUE} is not supported`,
    },
  },
  profileImg: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
});

const Student = model("Student", studentSchema);

export default Student;
