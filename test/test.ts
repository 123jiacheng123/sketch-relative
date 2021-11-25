const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, './sketch/勘探机械04.txt')

const fileResult = fs.readFileSync(filePath)
console.log(fileResult);
