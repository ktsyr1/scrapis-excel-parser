const express = require('express')
const app = express()
const fs = require('fs');
const multer = require("multer");
const upload = multer({ dest: "uploads/" })
const { readFile } = require('xlsx')

app.get('/', (req, res) => {
    res.status(200).json({ data: 'ok' })
})
async function rename(file) {
    let format = file.originalname.split('.')
    format = format[format.length - 1]

    let filename = `${file.path}.${format}`
    fs.rename(file.path, filename, (err) => {
        if (err) throw err;
    });
    return filename

}
app.post('/', upload.fields([{ name: 'excel', maxCount: 1 }]), async (req, res, next) => {
    let file = req.files.excel[0];
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        let path = await rename(file);
        console.log({ data: 'ok' });
        let data = await xlsx(path)
        res.json({ message: data });
    }
})

async function xlsx(path) {
    let { Sheets } = readFile(path);
    Data = Object.keys(Sheets)
    let SheetsKeys = Object.keys(Sheets[Data[0]])
    // return SheetsKeys.filter(item => item.search('!') === -1)
    return Sheets[Data[0]]

}


module.exports = app 