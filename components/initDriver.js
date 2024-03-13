const { Builder, Browser} = require('selenium-webdriver')
const Chrome = require('selenium-webdriver/chrome')
const path = require('path');
const fs = require('fs');

async function checkDriver(){
    try {
        console.log(Chrome.Driver)
        const filePath = '../chromedriver.exe'
        console.log(path.join(__dirname, filePath))
        
    } catch (error) {
        console.log(error)
        const filePath = '../chromedriver.exe'
        console.log(path.join(__dirname, filePath))
        if(fs.existsSync(path.join(__dirname, filePath))){
            const service = new Chrome.ServiceBuilder(path.join(__dirname, filePath)).build()
            console.log('ok')
            return true
        }else{
            console.log('no')
            return false
        }
    }
}

async function initDriver(){
    try {
            let options = new Chrome.Options()
            options.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36')
            options.addArguments('blink-settings=imagesEnabled=false')
            options.addArguments('--headless')//瀏覽器不提供頁面觀看，linux下如果系統是純文字介面不加這條會啓動失敗
            options.addArguments('--no-sandbox')
            options.addArguments('--disable-dev-shm-usage')//使用共享內存RAM
            options.addArguments('--disable-gpu')//規避部分chrome gpu bug
            options.addArguments('--log-level=3')
    
            let driver = 
                await new Builder()
                .forBrowser(Browser.CHROME)
                .setChromeOptions(options)
                .setChromeService()
                .build()
    
            return driver
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = { initDriver, checkDriver}