#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const GEORGIAN_MONTHS = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

const WEDDING_FILE = path.join(__dirname, "..", "data", "wedding.json");

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function formatGeorgianDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const monthName = GEORGIAN_MONTHS[month - 1];
  return `${day} ${monthName}, ${year}`;
}

function buildInitials(partner1, partner2) {
  const first = partner1.trim().charAt(0) || "";
  const second = partner2.trim().charAt(0) || "";
  return `${first} & ${second}`;
}

function buildIsoDate(dateStr, timeStr) {
  const [hours, minutes] = timeStr.split(":");
  return `${dateStr}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\nქორწილის მოწვევა — კლიენტის სწრაფი კონფიგურაცია\n");

  const partner1 = await ask(rl, "1. პარტნიორი 1 (სახელი, ქართულად)? ");
  const partner2 = await ask(rl, "2. პარტნიორი 2 (სახელი, ქართულად)? ");
  const weddingDate = await ask(rl, "3. ქორწილის თარიღი (YYYY-MM-DD)? ");
  const ceremonyName = await ask(rl, "4. ცერემონიის ადგილი (სახელი)? ");
  const ceremonyCity = await ask(rl, "5. ცერემონიის ქალაქი? ");
  const ceremonyTime = await ask(rl, "6. ცერემონიის დრო (HH:MM)? ");
  const receptionName = await ask(rl, "7. რეცეპციის ადგილი (სახელი)? ");
  const receptionTime = await ask(rl, "8. რეცეპციის დრო (HH:MM)? ");
  const dressCode = await ask(rl, "9. დრეს-კოდი? ");

  rl.close();

  if (!fs.existsSync(WEDDING_FILE)) {
    console.error(`\nშეცდომა: ფაილი არ მოიძებნა: ${WEDDING_FILE}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(WEDDING_FILE, "utf-8"));

  data.couple.partner1 = partner1;
  data.couple.partner2 = partner2;
  data.couple.initials = buildInitials(partner1, partner2);

  data.date = buildIsoDate(weddingDate, ceremonyTime);
  data.dateFormatted = formatGeorgianDate(weddingDate);

  data.venue.ceremony.name = ceremonyName;
  data.venue.ceremony.city = ceremonyCity;
  data.venue.ceremony.time = ceremonyTime;

  data.venue.reception.name = receptionName;
  data.venue.reception.time = receptionTime;

  data.dressCode = dressCode;

  fs.writeFileSync(WEDDING_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");

  console.log("\n✓ Done! Run: npm run build && netlify deploy --prod\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
