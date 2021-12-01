
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const fse = require("fs-extra");
const ImgStore = require("../src/store/ImgStore");

import { picassoArtboardCodeParse } from '../src'
import { picassoCodeFile } from '../../picasso-code/src'

const filePath = path.join(__dirname, './sketch/范安琪.sketch')
const outputPath = path.join(__dirname, './output')
ImgStore.set('absolutePath',outputPath)

// async function removeDir(path:string) {
//     try {
//        const res = fse.removeSync(path)
//        console.log('删除成功');
       
//     } catch (error) {
        
//     }
// }
// removeDir(outputPath)

exec(
    `unzip -o ${filePath} -d ${outputPath};`,
    async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

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
            const layers = [dealData]
            //1. web代码生成
            picassoCodeFile(layers, path.join(__dirname, './code'))
        }
    }
)