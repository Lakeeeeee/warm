async function crawlExample() {
    let driver
    try {
        driver = await new Builder().forBrowser(Browser.CHROME).build()
        await driver.get('https://www.selenium.dev/selenium/web/web-form.html')
        let title = await driver.getTitle()
        assert.equal("Web form", title)
        await driver.manage().setTimeouts({ implicit: 500 })

        let textBox = await driver.findElement(By.name('my-text'))
        let submitButtom = await driver.findElement(By.css('button'))

        await textBox.sendKeys('Selenium')
        await submitButtom.click()

        let message = await driver.findElement(By.id('message'))
        let value = await message.getText()
        assert.equal("Received!", value)
    } catch (error) {
        console.log(error)
    } finally {
        await driver.quit()
    }
}
