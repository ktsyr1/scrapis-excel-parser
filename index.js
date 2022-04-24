const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// start imports
const fs = require("fs");
const multer = require("multer");
let dir = "./uploads/"
const upload = multer({ dest: dir })
const { readFile } = require("xlsx")
// end imports

// start code 
app.get("/", (req, res) => res.send("scrapis api"))
app.post("/api", upload.fields([{ name: "excel", maxCount: 1 }]), async (req, res) => {
    let file = req.files.excel[0];
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        let path = await rename(file); 
        let data = await xlsx(path)
        res.status(200).json({ data });
    }
})

async function rename(file) {
    let format = file.originalname.split(".")
    format = format[format.length - 1]
    let filename = `${file.path}.${format}`
    try { 
        await fs.renameSync(file.path, filename)
        return filename
    } catch (err) { throw err }
}
async function xlsx(path) {
    try {
        let { Sheets } = readFile(path);
        return Sheets[Object.keys(Sheets)[0]]
    } catch (err) { throw err }
}

// end code


const port = 5000
app.listen(port, () => {
    console.log(`⚡️ app listening on port ${port}`)
})