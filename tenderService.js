const { Builder, Browser, By } = require('selenium-webdriver')
const { add } = require('date-fns')

const tenderService = {
    async crawl() {
        let driver
        const url = setUrl()
        try {
            driver = await new Builder().forBrowser(Browser.CHROME).build()
            await driver.get(url)
            await driver.sleep(500)
            const fileCount = await driver.findElement(By.xpath('//*[@id="pagebanner"]/span')).getText()
            const pages = Math.ceil(parseInt(fileCount) / 50)

            let page = 0
            let result = []
            
            let heads = await driver.findElements(By.xpath('//*[@id="tpam"]/thead'))
            for (let i = 0; i < heads.length; i++) {
                let rowObj = {}
                const tds = await heads[i].findElements(By.xpath('.//th'))
                for (let j = 0; j < tds.length; j++) {
                    rowObj[`Column${j + 1}`] = (await tds[j].getText())
                }
                result.push(rowObj)
            }
            do {
                await driver.sleep(500)
                
                let rowsB2 = await driver.findElements(By.className('tb_b2'))
                let rowsB3 = await driver.findElements(By.className('tb_b3'))

                for (let i = 0; i < rowsB2.length; i++) {
                    let rowObj = {}
                    const tds = await rowsB2[i].findElements(By.xpath('.//td'))
                    for (let j = 0; j < tds.length; j++) {

                        if (j == tds.length - 1) {
                            rowObj[`Column${j + 1}`] = await tds[j].findElement(By.xpath('.//div/a')).getAttribute('href')
                        } else {
                            rowObj[`Column${j + 1}`] = await tds[j].getText()
                        }

                    }
                    result.push(rowObj)
                }

                for (let i = 0; i < rowsB3.length; i++) {
                    let rowObj = {}
                    const tds = await rowsB3[i].findElements(By.xpath('.//td'))
                    for (let j = 0; j < tds.length; j++) {

                        if (j == tds.length - 1) {
                            rowObj[`Column${j + 1}`] = await tds[j].findElement(By.xpath('.//div/a')).getAttribute('href')
                        } else {
                            rowObj[`Column${j + 1}`] = await tds[j].getText()
                        }

                    }
                    result.push(rowObj)
                }
                
                if (page == pages - 1) {
                    return result
                }
                const nextPageLink = await driver.findElement(By.xpath("//a[text()='下一頁']"))
                nextPageLink.click()
                page++
            } while (page < pages)
        } catch (error) {
            console.log(error)
        } finally {
            //await driver.quit()
        }
    },
}

async function setUrl() {
    const startDate = new Date()
    const endDate = add(new Date(), {
        days: 7
    })

    let vars = {
        orgName: '',
        orgId: '',
        tenderName: '市',
        tenderId: '',
        tenderType: '',
        tenderWay: '',
        dateType: 'TENDER_DECLARATION',
        tenderStartDate: encodeURIComponent(startDate.toLocaleDateString()),
        tenderEndDate: encodeURIComponent(endDate.toLocaleDateString()),
        radProctrgCate: '',
        policyAdvocacy: ''
    }

    let url =
        `https://web.pcc.gov.tw/prkms/tender/common/basic/readTenderBasic?
     pageSize=50
     &firstSearch=true
     &searchType=basic
     &isBinding=N
     &isLogIn=N
     &level_1=on
     &orgName=${vars.orgName}
     &orgId=${vars.orgId}
     &tenderName=${vars.tenderName}
     &tenderId=${vars.tenderId}
     &tenderType=${vars.tenderType}
     &tenderWay=${vars.tenderWay}
     &dateType=${vars.dateType}
     &tenderStartDate=${vars.tenderStartDate}
     &tenderEndDate=${vars.tenderEndDate}
     &radProctrgCate=${vars.radProctrgCate}
     &policyAdvocacy=${vars.policyAdvocacy}`.replaceAll(' ', '')
    return url
}

module.exports = tenderService