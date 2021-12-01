import { SKLayer, Image } from '../types';
// const Jimp = require("jimp");
const path = require("path");
// const ImgStore = require("../../../src/store/ImgStore.ts");
/**
 * 切片(Slice) => 图片
 * @param image Picasso-DSL图层
 * @param layer Sketch图层
 */

const upload = async (file) => {
    // @ts-ignore
    if (global.loader) {
        // @ts-ignore
        let loader = global.loader
        let res = await loader(file);
        return res[file];
    }
    return null
};

const bitmapParser = async ({ x, y, w, h, resized_w, resized_h, image }) => {
    // let outputPath = ImgStore.get('absolutePath')
    // let file = path.join(outputPath, image);
    // @ts-ignore
    let file = path.join(global.ImgStore, image)
    // let img = await Jimp.read(file);
    let cropw = Math.min(resized_w, w)
    let croph = Math.min(resized_h, h)
    try {
        // await img.resize(resized_w, resized_h).crop(x, y, cropw, croph).writeAsync(file);
        let res = await upload(file);
        return res || image;
    } catch (error) {
        console.log(error);
    }
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
            image.value = await bitmapParser(corpInfo)
        }
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
