
const fs = require("fs");
const path = require("path");
import { picassoArtboardCodeParse } from '../picasso-package/packages/picasso-parse/src'
import { picassoCodeFile } from '../picasso-package/packages/picasso-code/src'

const dsl = require('./entry/code_dsl2.json')

const data = picassoArtboardCodeParse(dsl); // 毕加索插件解析后的json

const layers = [data]


        //1. web代码生成
        picassoCodeFile(layers, path.join(__dirname, './code'))

/**
 * 创建mkdir文件夹用于存放  毕加索插件解析后的json
 */
// const fileName2 = path.resolve(__dirname, './mkdir/test.json')
// if (fs.existsSync(fileName2)) {
//     // -- 同步删除文件
//     fs.unlinkSync(fileName2, function(err) {
//         if (err) return
//     })
//     fs.rmdir('./test/mkdir', function(err) {
//         if (err) return
//         console.log('删除目录成功')
//       })
// }

// fs.mkdir('./test/mkdir', function(err) {
//     if (err) return
//     console.log('创建目录成功')
//     fs.writeFile(fileName2, JSON.stringify(data), function (err) {
//         if (err) {
//             // 出错
//             console.log(err.message)
//             return
//         }
//   })
// })