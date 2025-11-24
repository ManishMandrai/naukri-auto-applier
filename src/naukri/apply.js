async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function applyOnNaukri(page) {
  console.log("➡ Starting Auto Apply (with Pagination)...");

  let pageCount = 1;

  while (true) {
    console.log(`\n========================`);
    console.log(`➡ Processing Page ${pageCount}`);
    console.log(`========================\n`);

    await autoScroll(page);

    const jobCards = await page.$$("div.cust-job-tuple.layout-wrapper");
    console.log(`✔ Found ${jobCards.length} job cards`);

    for (let i = 0; i < jobCards.length; i++) {
      console.log(`\n➡ Opening job ${i + 1}/${jobCards.length}`);

      let jobLink;
      try {
        jobLink = await jobCards[i].$eval("a.title", (el) => el.href);
      } catch {
        console.log("❌ No link found, skipping...");
        continue;
      }

      const jobPage = await page.browser().newPage();
      await jobPage.goto(jobLink, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      await sleep(2500);

      try {
        const companyApply = await jobPage.$("#company-site-button");
        if (companyApply) {
          console.log("⏭ Skipped (Apply on Company Site)");
          await jobPage.close();
          continue;
        }

        const applyBtn = await jobPage.$("#apply-button");
        if (applyBtn) {
          await applyBtn.click();
          console.log("✔ Applied");
        } else {
          console.log("❌ Apply button not found");
        }
      } catch (err) {
        console.log("❌ Error applying:", err.message);
      }

      await jobPage.close();
      await sleep(1200);
    }

    // PAGINATION — Find Next Button
    const nextBtnSelector =
      "div.styles_pagination__oIvXh a:has(span)"; // general selector

    const nextButtons = await page.$$(nextBtnSelector);

    let nextFound = false;

    for (const btn of nextButtons) {
      const text = await page.evaluate((el) => el.innerText.trim(), btn);

      if (text === "Next") {
        nextFound = true;
        console.log("\n➡ Moving to NEXT page...");
        await Promise.all([
          btn.click(),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);
        pageCount++;
        break;
      }
    }

    if (!nextFound) {
      console.log("\n🚫 No more pages. Pagination complete.");
      break;
    }

    // wait for next page to load
    await sleep(2000);
  }

  console.log("\n🎯 AUTO APPLY WITH PAGINATION COMPLETED");
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 900;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight - 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
}

module.exports = { applyOnNaukri };
