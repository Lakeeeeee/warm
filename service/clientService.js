const { add } = require('date-fns')
const fs = require('fs')
const path = require('path')

const clientService = {
    async getBasicUrlOptions() {
        const startDate = new Date()
        const endDate = add(new Date(), {
            days: 7
        })

        const pathx = path.join(__dirname, '../basicUrlData.json')
        const fileData = fs.readFileSync(pathx, 'utf8')
        const basicUrlData = JSON.parse(fileData)
        
        return {
            orgName: basicUrlData['orgName'] || '' ,
            orgId: basicUrlData['orgId'] || '',
            tenderName: basicUrlData['tenderName'] || '',
            tenderId: basicUrlData['tenderId'] || '',
            tenderType: basicUrlData['tenderType'] || '',
            tenderWay: basicUrlData['tenderWay'] || '',
            dateType: basicUrlData['dateType'] || 'TENDER_DECLARATION',
            tenderStartDate: basicUrlData['tenderStartDate'] || encodeURIComponent(startDate.toLocaleDateString()),
            tenderEndDate: basicUrlData['tenderEndDate'] || encodeURIComponent(endDate.toLocaleDateString()),
            radProctrgCate: basicUrlData['radProctrgCate'] || '',
            policyAdvocacy: basicUrlData['policyAdvocacy'] || ''
        }
    },
    async setBasicUrlOptions(jsonData) {
        const filePath = './basicUrlData.json';
        const updatedJsonString = JSON.stringify(jsonData)
        fs.writeFile(filePath, updatedJsonString, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return false
            }
            console.log('JSON data has been updated and written to file')
        })
    }
}

module.exports = clientService