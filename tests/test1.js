const assert = require('assert');
const {Builder, By, Key, until} = require('selenium-webdriver');

let driver = new Builder()
    .forBrowser('chrome')
    .build();

// driver.get('http://www.google.com/ncr');
// driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();

describe('Google Search', function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    //await driver.quit();
	driver.quit();
  });

  // it('example', async function() {
    // await driver.get('https://www.google.com/ncr');

    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);

    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

    // let url = await driver.getCurrentUrl();
    // assert.ok(
        // url.startsWith('https://www.google.com/search'),
        // 'unexpected url: ' + url);
  // });
  
  
  it('should be running', async function() {
    await driver.get('http://localhost:5706/');

    await driver.wait(until.titleIs('VacationChamp'), 1000);

    let url = await driver.getCurrentUrl();
    assert.ok(
        url.startsWith('http://localhost:5706/'),
        'unexpected url: ' + url);
  });
  
  it('should be able to show login window', async function() {
    await driver.get('http://localhost:5706/');

    await driver.wait(until.titleIs('VacationChamp'), 1000);
	
	await driver.findElement(By.className('trigger-sign-in-modal')).sendKeys(Key.RETURN)

    let loginModal = await driver.findElement(By.id('modal-signin'));
    assert.notEqual(
        loginModal,
		null,
        'Could not find login window');
  });
  
  it('should be able to login', async function() {
    await driver.get('http://localhost:5706/');

    await driver.wait(until.titleIs('VacationChamp'), 1000);
	
	await driver.findElement(By.className('trigger-sign-in-modal')).sendKeys( Key.RETURN)

    let loginModal = await driver.findElement(By.id('modal-signin'));
	
	let userInput = await loginModal.findElement(By.name('userName'));
	
	
	userInput.sendKeys('erabinovitz@vacationchamp.com', Key.RETURN);
	
	
	driver.pause(10000);
	
    assert.notEqual(
        loginModal,
		null,
        'Could not login');
  });
  
  
});
