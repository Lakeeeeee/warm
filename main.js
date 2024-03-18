const server = require('./route.js')
const clientService = require('./service/clientService.js')
const tenderService = require('./service/tenderService.js')
const excelTool = require('./components/excelTool.js')
const schedule = require('node-schedule')

const processCrawl = async () => {
    const urlOptions = await clientService.getBasicUrlOptions()
    const urlBasic = await tenderService.setCrawlBasicUrl(urlOptions)
    const result = await tenderService.crawlBasic(urlBasic)
    await excelTool.exportToExcel(result)
    //todo: send email
}

//main process
try {
    //open setting page
    const PORT = process.env.PORT || 3030
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

    //first crawl
    processCrawl()

    //crawl by schedule
    let taskFrequence = '*/1 * * * *'
    schedule.scheduleJob(taskFrequence, () => {
        console.log('now is :' + new Date())
        processCrawl()
    })

} catch (e) {
    console.log(e)
}