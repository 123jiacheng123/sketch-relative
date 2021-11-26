
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const fse = require("fs-extra");

import { picassoArtboardCodeParse } from '../src'
import { picassoCodeFile } from '../../picasso-code/src'

const filePath = path.join(__dirname, './sketch/勘探机械04.sketch')
const outputPath = path.join(__dirname, './output')

// const dsl = require('./entry/original.json') // original  code_dsl2
// const takeOffWrap = dsl.layers[0]
// const data = picassoArtboardCodeParse(takeOffWrap); // 毕加索插件解析后的json

// const layers = [data]

// //1. web代码生成
// picassoCodeFile(layers, path.join(__dirname, './code'))


// 获取sketch源文件信息
// let outputPath = ''
// if (!outputPath) {
//     outputPath = "./output";
// }
debugger
exec(
    `unzip -o ${filePath} -d ${outputPath};`,
    async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        // fse.ensureDir(outputPath);

        // 复制图片到结果文件夹
        fse.copySync(`${outputPath}/images`, `${outputPath}/html/images`);

        // // 复制模板资源文件夹
        // fse.copySync(
        //     path.join(__dirname, "./template/assets"),
        //     `${outputPath}/html/assets`
        // );
        // // 复制首页
        // fse.copySync(
        //     path.join(__dirname, "./template/index.html"),
        //     `${outputPath}/html/index.html`
        // );
        // 读取每个 page 的信息
        let files = fs.readdirSync(`${outputPath}/pages`);
        let fileStore = {};
        files.forEach((f) => {
            fileStore[f] = JSON.parse(
                fs.readFileSync(`${outputPath}/pages/` + f).toString()
            );
        });
        // outPages = [];
        let outResults = [];
        // 对每个页面进行处理解析
        for (const f of files) {
            let data = fileStore[f];
            const takeOffWrap = data.layers[0]
            const dealData = picassoArtboardCodeParse(takeOffWrap); // 毕加索插件解析后的json

            const layers = [dealData]

            //1. web代码生成
            picassoCodeFile(layers, path.join(__dirname, './code'))
            // TODO:del
            // fs.writeFileSync("./tmp/data.json", JSON.stringify(data));
            // let result = await layerParser(data);

            // fse.outputFileSync(
            //     `${outputPath}/result.json`,
            //     JSON.stringify(result)
            // );
            // outResults.push(result);
        }
        // outResults.forEach((result) => {
        //     if (result.type === "page") {
        //         handleArtBoard(result, `page-${result.name}`, outputPath);
        //     }
        // });

        // 输出模板页面 js 中的页面配置数据
        // fse.outputFileSync(
        //     `${outputPath}/html/index.js`,
        //     (() => {
        //         let r = "window.data = [];\n";
        //         outPages.forEach((p) => {
        //             r += `data.push({url:'${p.url}',title:'${p.name}',type:'folder'});\n`;
        //         });
        //         return r;
        //     })()
        // );
    }
)


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