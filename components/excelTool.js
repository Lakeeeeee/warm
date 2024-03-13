let xl = require('excel4node')
const fs = require('fs')

const ExcelTool = {
    async exportToExcel(jsonArray) {
        let workbook = new xl.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        jsonArray.forEach((item, index)=>{
            for(let i = 0; i < Object.keys(item).length; i++){
                const values = Object.values(item)
                worksheet.cell(index + 1, i+1).string(values[i])
            }
        })

        const outputPath = `${process.env.HOME}/Desktop/output.xlsx`
        workbook.write(outputPath, (err, stats) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Excel file written');
            }
        })
    }
}

module.exports = ExcelTool