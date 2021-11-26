import { SKLayer, Image } from '../types';
const Jimp = require("jimp");
const path = require("path");

/**
 * 切片(Slice) => 图片
 * @param image Picasso-DSL图层
 * @param layer Sketch图层
 */

const qcdn = require("@q/qcdn");

const loader = (filePaths) => {
    // filePaths:文件路径/文件路径数组
    return qcdn.upload(filePaths, {
        image: {
            https: true,
        },
    });
};

const upload = async (file) => {
    let res = await loader(file);
    return res[file];
    return null;
};

const bitmapParser = async ({ x, y, w, h, resized_w, resized_h, image }) => {
    debugger
    // let outputPath = ImgStore.get("absolutePath");
    const outputPath = path.join(__dirname, "./output");
    let file = path.join(outputPath, image);
    let img = await Jimp.read(file);
    let cropw = Math.min(resized_w, w)
    let croph = Math.min(resized_h, h)
    await img.resize(resized_w, resized_h).crop(x, y, cropw, croph).writeAsync(file);
    let res = await upload(file);
    return res || 'https://p5.ssl.qhimg.com/t01a7f64ff034704297.png';
};

const parseImage = async (image: any, layer: SKLayer, type: string): Promise<Object> => {
    // 画板图赋值
    if (layer._class === 'artboard') {
        image.value = layer.imageUrl;
        // 切片转换为图片
    } else if (layer._class === 'bitmap') {
        const { isVisible, frame, image: { _ref } } = layer
        if (isVisible) {
            let maskLayerFrame = {}
            let corpInfo = {
                x: Math.abs(frame.x),
                y: Math.abs(frame.y),
                resized_w: frame.width,
                resized_h: frame.height,
                w: 0,
                h: 0,
                image: _ref + "",
            };
            image.value = await bitmapParser(corpInfo);
        }
        // image.value = 'https://p5.ssl.qhimg.com/t01a7f64ff034704297.png'
        image.type = 'Image'
    }
    // else if (layer.imageUrl) {
    //     if (type === 'lowcode') {
    //         image.type = 'WBImage';
    //     } else {
    //         image.type = 'Image';
    //     }

    //     image.value = layer.imageUrl;
    // }

    return image;
}


export default parseImage;
