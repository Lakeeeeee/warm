const { add } = require('date-fns')

const clientService = {
    async getUrlOptions(){
        const startDate = new Date()
        const endDate = add(new Date(), {
            days: 7
        })

        return {
            orgName: '',
            orgId: '',
            tenderName: '南投',
            tenderId: '',
            tenderType: '',
            tenderWay: '',
            dateType: 'TENDER_DECLARATION',
            tenderStartDate: encodeURIComponent(startDate.toLocaleDateString()),
            tenderEndDate: encodeURIComponent(endDate.toLocaleDateString()),
            radProctrgCate: '',
            policyAdvocacy: ''
        }
    }
}

module.exports = clientService