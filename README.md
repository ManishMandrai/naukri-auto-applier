
---

# 🤖 Naukri Auto Applier

A fully automated bot that applies to jobs on **Naukri.com** based on your skills, filters, and preferences.
Built to save time and boost job reach by removing manual repetitive tasks.

---

## 🚀 Features

* Automatic login
* Keyword-based job search
* Filters: experience, location, salary, freshness
* Auto-apply to matching jobs
* Skip already applied jobs
* Auto-select resume
* Human-like delays for safety
* Progress logs
* Optional Excel support for tracking

---

## 🛠 Tech Stack

* Node.js
* Puppeteer
* JavaScript
* XLSX (optional)
* Dotenv

---

## 📁 Project Structure

naukri-auto-applier/
├── src/
│   ├── login.js – Login automation
│   ├── searchJobs.js – Job search logic
│   ├── applyJobs.js – Auto-apply logic
│   ├── utils.js – Helpers
│   └── config.js – Filters and preferences
│
├── data/
│   └── applied.xlsx – Track already applied jobs
│
├── .env
├── package.json
└── index.js – Main entry file

---

## ⚙️ Setup Instructions

### 1. Install dependencies

npm install

### 2. Create `.env`

NAUKRI_EMAIL="your-email"
NAUKRI_PASSWORD="your-password"

### 3. Update `config.js`

keywords: ["Frontend Developer", "React Developer"]
locations: ["Delhi", "Bhopal", "Remote"]
minSalary: 3
maxExperience: 2
jobFreshness: 7

### 4. Run the bot

npm start

---

## 🔒 Notes

* Captchas may require manual solving
* Built-in throttle delays prevent blocks
* Created for personal + educational use

---

## 👤 Developer

**Dev Manish**
Portfolio: [https://devmanish.com](https://devmanish.com)

---
