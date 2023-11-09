import { browser } from "webextension-polyfill-ts";

browser.storage.onChanged.addListener((storage) => {
  console.log(`Storage just changed ${storage}`);
});

browser.runtime.onStartup.addListener(async function () {
  await initData();
});

browser.runtime.onInstalled.addListener(async function () {
  await initData();
});

async function initData(): Promise<void> {
  console.log("init");
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: "lib/browser-polyfill.js" });
  browser.tabs.executeScript({ file: "content-script.js" });
});
