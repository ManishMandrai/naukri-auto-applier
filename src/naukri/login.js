async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function isLoggedIn(page) {
  // Force hydrate header
  await page.evaluate(() => window.scrollTo(0, 0));

  // Try all known selectors from your screenshot
  const selectors = [
    "img.nI-gNb-header__user-icon[alt='naukri user profile img']",
    "img.nI-gNb-header__user-icon",
    "span.nI-gNb-icon-badge",            // notification badge
    "a.nI-gNb-menu-item__title",         // Jobs/Companies/Services top links
    "div.nI-gNb-header"                  // header wrapper (logged-in only)
  ];

  for (const sel of selectors) {
    const found = await page.$(sel);
    if (found) return true;
  }

  return false;
}

async function loginNaukri(page) {
  console.log("➡ Checking login session...");

  // Load homepage (NOT dashboard)
  await page.goto("https://www.naukri.com/", {
    waitUntil: "networkidle2",
  });

  // Wait EXTRA for React hydration
  await sleep(5000);

  // Check login again after hydration
  if (await isLoggedIn(page)) {
    console.log("✔ Logged in (profile/header detected after hydration)");
    return true;
  }

  console.log("❌ Still not detecting login, but header might be delayed.");

  // Try refreshing once
  await page.reload({ waitUntil: "networkidle2" });
  await sleep(4000);

  if (await isLoggedIn(page)) {
    console.log("✔ Logged in after refresh!");
    return true;
  }

  console.log("❌ Naukri header still not visible. Opening login page...");
  await page.goto("https://www.naukri.com/nlogin/login", {
    waitUntil: "networkidle2",
  });

  console.log("➡ Login page opened. Login manually once, then restart.");
  return false;
}

module.exports = { loginNaukri };
