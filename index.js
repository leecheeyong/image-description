import fetch from "node-fetch";
import path from "path";
import fs from "fs";
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

const exportFileName = 'data.csv'
const imageExtensions = [".jpg", ".JPG", ".png"];
const dir = "./images";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const data = [];

function asyncFunction(item) {
  return new Promise(async (resolve, reject) => {
    await wait(2000);
    const fullPath = path.join(dir, item.name);
    if (item.isFile()) {
      const ext = path.extname(item.name);
      if (imageExtensions.includes(ext)) {
        await fetch("https://docsbot.ai/api/tools/image-prompter", {
          credentials: "omit",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0",
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "Sec-GPC": "1",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            Priority: "u=0",
          },
          referrer: "https://docsbot.ai/tools/image/description-generator",
          body:
            `{\"type\":\"description\",\"image\":"` +
            fs.readFileSync(`${fullPath}`, "base64") +
            `"}`,
          method: "POST",
          mode: "cors",
        })
          .then((r) => r.text())
          .then((description) => {
            data.push({
              fileName: item.name,
              description: description.trim(),
            });
            resolve();
          });
      }
    }
  });
}

fs.readdir(dir, { withFileTypes: true }, (err, items) => {
  if (err) {
    console.error(`Error reading directory ${dir}:`, err);
    return;
  }
  const promiseArray = items.map(asyncFunction);
  Promise.all(promiseArray).then(() => {
    const csv = generateCsv(mkConfig({ useKeysAsHeaders: true }))(data);
    writeFile(exportFileName, new Uint8Array(Buffer.from(asString(csv))), (err) => {
      if (err) throw err;
      console.log("CSV file saved: ", exportFileName);
    });
  });
});
