let xl = require('excel4node')
const fs = require('fs')

const ExcelTool = {
    async exportToExcel(jsonArray) {
        let workbook = new xl.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        jsonArray.forEach((item, index)=>{
            console.log(item)
            for(let i = 0; i < Object.keys(item).length; i++){
                const values = Object.values(item)
                worksheet.cell(index + 1, i+1).string(values[i])
            }
        })

        const outputPath = `${process.env.HOME}/Desktop/output.xlsx`; // 預設桌面路径，适用于 macOS 和 Linux
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