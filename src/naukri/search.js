// src/naukri/search.js
const { JOB_ROLES, JOB_LOCATION, MIN_EXP, MAX_EXP } = require("../../config");

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function searchNaukriJobs(page) {
  console.log("➡ Starting job search...");

  await page.goto("https://www.naukri.com/", {
    waitUntil: "networkidle2",
  });

  await sleep(4000); // hydration

  // -------------------------------
  // 1️⃣ TYPE KEYWORDS
  // -------------------------------

  console.log("➡ Typing JOB ROLES...");
  // Click keyword section to expand
  await page.click("div.nI-gNb-sb__keywords");
  await sleep(800);

  const keywordInput =
    "div.nI-gNb-sb__keywords input.suggestor-input[tabindex='0']";

  await page.waitForSelector(keywordInput, { timeout: 5000 });
  await page.click(keywordInput, { clickCount: 3 });
  await page.type(keywordInput, JOB_ROLES, { delay: 20 });

  console.log("✔ Typed roles:", JOB_ROLES);

  // -------------------------------
  // 2️⃣ SELECT EXPERIENCE (Dropdown)
  // -------------------------------

  console.log("➡ Selecting Experience...");

  const expInput = "input#experienceDD";

  await page.click(expInput);
  await sleep(500);

  // Build selector for experience like "0-2 years"
  // Naukri shows menu items dynamically

  const expOption = `span[title='${MIN_EXP}-${MAX_EXP} Years']`;
  const expFallback = `span[title='${MIN_EXP}-${MAX_EXP} years']`;

  try {
    await page.waitForSelector(expOption, { timeout: 5000 });
    await page.click(expOption);
    console.log("✔ Selected experience:", MIN_EXP, "-", MAX_EXP);
  } catch {
    try {
      await page.waitForSelector(expFallback, { timeout: 5000 });
      await page.click(expFallback);
      console.log("✔ Selected experience (fallback).");
    } catch {
      console.log("⚠ Experience dropdown not found. Skipping.");
    }
  }

  // -------------------------------
  // 3️⃣ TYPE LOCATION
  // -------------------------------

  console.log("➡ Typing Locations...");

  await page.click("div.nI-gNb-sb__locations");
  await sleep(800);

  const locationInput =
    "div.nI-gNb-sb__locations input.suggestor-input[tabindex='0']";

  await page.waitForSelector(locationInput, { timeout: 5000 });
  await page.click(locationInput, { clickCount: 3 });
  await page.type(locationInput, JOB_LOCATION, { delay: 20 });

  console.log("✔ Typed locations:", JOB_LOCATION);

  // -------------------------------
  // 4️⃣ CLICK SEARCH BUTTON
  // -------------------------------

  console.log("➡ Clicking Search button...");
  await page.click("button.nI-gNb-sb__icon-wrapper");

  await sleep(5000);
  console.log("✔ Job search results loaded!");
}

module.exports = { searchNaukriJobs };
