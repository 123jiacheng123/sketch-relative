
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const fse = require("fs-extra");
const ImgStore = require("../src/store/ImgStore");
const qcdn = require("@q/qcdn");
// @ts-ignore
global.loader = (filePaths) => {
    // filePaths:文件路径/文件路径数组
    return qcdn.upload(filePaths, {
        image: {
            https: true,
        },
    });
};

import { picassoArtboardCodeParse } from '../picasso-package/packages/picasso-parse/src'
import { picassoCodeFile } from '../picasso-package/packages/picasso-code/src'

const filePath = path.join(__dirname, './sketch/机械商业设备05.sketch')
const outputPath = path.join(__dirname, './output')
const codePath = path.join(__dirname, './code')
ImgStore.set('absolutePath', outputPath)
// @ts-ignore
global.ImgStore = outputPath


// 获取sketch源文件信息
// let outputPath = ''
// if (!outputPath) {
//     outputPath = "./output";
// }
fse.remove(codePath, err => {
    if (err) return console.error(err)
    console.log('code delete success!')
})
fse.remove(outputPath, err => {
    if (err) return console.error(err)
    console.log('outPyth delete success!')
})
exec(
    `unzip -o ${filePath} -d ${outputPath};`,
    async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('开始了！');


        // 复制图片到结果文件夹
        fse.copySync(`${outputPath}/images`, `${outputPath}/html/images`);
        // 读取每个 page 的信息
        let files = fs.readdirSync(`${outputPath}/pages`);
        let fileStore = {};
        files.forEach((f) => {
            fileStore[f] = JSON.parse(
                fs.readFileSync(`${outputPath}/pages/` + f).toString()
            );
        });
        // 对每个页面进行处理解析
        for (const f of files) {
            let data = fileStore[f];
            const takeOffWrap = data.layers[0]
            const dealData = await picassoArtboardCodeParse(takeOffWrap); // 毕加索插件解析后的json
            //1. web代码生成
            picassoCodeFile([dealData], codePath)
        }
        console.log('over');
        
    }
)