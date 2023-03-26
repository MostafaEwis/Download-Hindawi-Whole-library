const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();
// حط الـ file path  هنا يا عموري
const service = new chrome.ServiceBuilder(process.env.ChromeDriverPath);
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeService(service)
  .build();
const happen = async () => {
  driver.get("https://www.hindawi.org/books");
  await driver.manage().setTimeouts({ implicit: 5000 });
  // اللوب دي بتلف على صفحات الكتب كلها جبت عددهم من هنداوي
  for (let i = 0; i < 149; i++) {
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
