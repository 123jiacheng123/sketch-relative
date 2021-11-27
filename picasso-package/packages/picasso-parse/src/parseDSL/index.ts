// @ts-nocheck
import { DSL, Component, SKLayer } from '../types';
import parseText from './parseText';
import parseStructure from './parseStructure';
import parseStyle from './parseStyle';
import parseImage from './parseImage';
import handleSlicePosition from './handleSlicePosition';
import filterGroupLayer from './filterGroupLayer';

// import * as fs from 'fs';

const _parseDSL = async (sketchData: SKLayer[], type: string):Promise<DSL> => {
    const dsl: DSL=[];
    for(let layer: SKLayer of  sketchData) {
        let dslLayer: Component = {
            type: 'Container',
            id: layer.do_objectID,
            name: layer.name,
            symbolName: layer.symbolName || ''
        }

        // 组件
        if (type === 'lowcode') {
            dslLayer.type = 'View';

            // 被解绑的组件
            if (layer.haikuiComponentInfo) {
                dslLayer.haikuiComponentInfo = layer.haikuiComponentInfo;
            }
        }

        if (type !== 'lowcode') {
            // 组件跳转信息
            if (layer.symbolComponentObject) {
                dslLayer.symbolComponentObject = layer.symbolComponentObject;
            }

            // 面板解析
            dslLayer.panel = layer.panel;
        }

        // 结构解析
        dslLayer.structure = { ...dslLayer.structure, ...parseStructure(layer) };
        // 样式解析
        dslLayer.style = { ...dslLayer.style, ...parseStyle(layer) };
        // 文本处理
        dslLayer = parseText(dslLayer,layer)
        // 图片处理
        dslLayer = await parseImage(dslLayer,layer,type)

        if (dslLayer.type !=='Text' && Array.isArray(layer.layers)) {
            dslLayer.children = await _parseDSL(layer.layers,type);
        }

        dsl.push(dslLayer);
    }

    return dsl;
}

export default async (sketchData: SKLayer[], type: string): Promise<DSL> => {
    const layers: SKLayer[] = [];
    
    for (let i = 0; i < sketchData.length; i++) {
        const layer = sketchData[i];
        // 去掉分组
        layer.layers = filterGroupLayer(layer.layers, [], type);
        // 标注模式下，切片进行排序  切片没用到，可以考虑移除！！！
        if (type === 'measure') {
            layer.layers = handleSlicePosition(layer.layers);
        }

        layers.push(layer);
    }

    return await _parseDSL(layers, type);
};
