const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();
const service = new chrome.ServiceBuilder(process.env.ChromeDriverPath);
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeService(service)
  .build();
const happen = async () => {
  driver.get("https://www.hindawi.org/books");
  await driver.manage().setTimeouts({ implicit: 5000 });
  booksCount = await driver.findElement(By.className("count")).getText();
  let pages;
  booksCount = booksCount.split("");
  for (let i = 0; i < booksCount.length; i++) {
    booksCount[i] = String.fromCodePoint(booksCount[i].codePointAt() - 1584);
  }
  booksCount = booksCount.join("");
  booksCount = parseInt(booksCount);
  pages = (booksCount - (booksCount % 20)) / 20 + (booksCount % 20 > 0 ? 1 : 0);
  // اللوب دي بتلف على صفحات الكتب كلها جبت عددهم من هنداوي
  for (let page = 0; page < pages; page++) {
    // دي لستة الكتب
    let books = await driver.findElements(By.className("link"));
    // ده الزرار اللي بينقلنا لصفحة الكتب الجاية
    let goNext = await driver.findElements(By.className("mIcon"));
    //  دول بيخلوا الـ terminal  شكله روش ولكن ملهمش لازم الحقيقة
    console.table(goNext);
    console.table(books);
    // اللوب دي بتلف على الكتب في الصفحة عشان تنزلهم
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      // كل كتاب هنا بنخش عليه وبنحمله pdf
      await book.click();
      await driver.findElement(By.id("pdf")).click();
      // بنرجع للصفحة الرئيسية عشان نفتح كتاب تاني
      await driver.navigate().back();
    }
    // بنروج الصفحة اللي بعدها من هنا
    await goNext[5].click();
  }
};

happen();
