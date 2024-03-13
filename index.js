const clientService = require('./service/clientService.js')
const tenderService = require('./service/tenderService.js')
const excelTool = require('./components/excelTool.js')

const main = async () => {
    //todo: 排程
    
    const urlOptions = await clientService.getUrlOptions() //todo
    const urlBasic = await tenderService.setCrawlBasicUrl(urlOptions) //ondoing
    const result = await tenderService.crawlBasic(urlBasic)
    excelTool.exportToExcel(result)

    //todo: send email
    
}

main()