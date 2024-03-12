const tenderService = require('./tenderService.js')

const main = async () => {
    //todo: 排程
    const result = await tenderService.crawl()
    //todo: 彙整成excel 或html

    //todo: send email
    
}

main()