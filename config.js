// config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  NAUKRI_EMAIL: process.env.NAUKRI_EMAIL,
  NAUKRI_PASS: process.env.NAUKRI_PASS,
  JOB_ROLES: process.env.JOB_ROLES || "",
  JOB_LOCATION: process.env.JOB_LOCATION || "",
  MIN_EXP: Number(process.env.MIN_EXP || 0),
  MAX_EXP: Number(process.env.MAX_EXP || 1),
};
