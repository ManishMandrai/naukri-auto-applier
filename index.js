const { initBrowser } = require("./src/core/browser");
const { loginNaukri } = require("./src/naukri/login");
const { searchNaukriJobs } = require("./src/naukri/search");
const { applyOnNaukri } = require("./src/naukri/apply");

async function main() {
  const { browser, page } = await initBrowser();

  const logged = await loginNaukri(page);
  if (!logged) return;

  await searchNaukriJobs(page);

  await applyOnNaukri(page);

  console.log("✅ All Done!");
}

main();
