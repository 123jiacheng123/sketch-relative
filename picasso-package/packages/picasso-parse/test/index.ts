// import * as path from 'path'
// import * as fs from 'fs'
const fs = require("fs");
const path = require("path");

import { picassoArtboardCodeParse } from '../src'
const dsl = require('./code_dsl2.json')

const data = picassoArtboardCodeParse(dsl);

const fileName2 = path.resolve(__dirname, './mkdir/test.json')
if (fs.existsSync(fileName2)) {
    // -- 同步删除文件
    fs.unlinkSync(fileName2, function(err) {
        if (err) return
    })
    fs.rmdir('./test/mkdir', function(err) {
        if (err) return
        console.log('删除目录成功')
      })
}

fs.mkdir('./test/mkdir', function(err) {
    if (err) return
    console.log('创建目录成功')
    fs.writeFile(fileName2, JSON.stringify(data), function (err) {
        if (err) {
            // 出错
            console.log(err.message)
            return
        }
  })
})









