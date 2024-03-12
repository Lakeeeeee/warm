const clientService = require('./service/clientService.js')
const tenderService = require('./service/tenderService.js')

const main = async () => {
    //todo: 排程
    
    const urlOptions = await clientService.getUrlOptions() //todo
    const urlBasic = await tenderService.setCrawlBasicUrl(urlOptions) //ondoing
    const result = await tenderService.crawlBasic(urlBasic)
    //todo: 彙整成excel 或html

    //todo: send email
    
}

main()