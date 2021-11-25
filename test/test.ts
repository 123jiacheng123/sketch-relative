const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, './sketch/勘探机械04.sketch')
const outputPath = path.join(__dirname, './sketch/code.json')

const file = fs.createReadStream( filePath, { encoding: "utf8" } );
const out = fs.createWriteStream( outputPath, { encoding: "utf8" } );

file.on( "data", function ( dataChunk ) {
    out.write( dataChunk, function () {
        console.log( "start" );
    } )
} )

out.on( "open", function ( fd ) {
    console.log( "pending", fd );
} )

file.on( "end", function () {
    out.end( "，再见", function () {
        console.log( "over" );
        console.log( "共写入%d字节数据", out.bytesWritten );
    } )
} )
// fs.openSync(filePath, 'r+', (err, fd) => {
//     if (err) return
//     const fileResult = fs.readFileSync(filePath, 'utf8')
//     console.log(fileResult);
//     // fs.writeFileSync(outputPath, fileResult )
//     // const ws = fs.createWriteStream(outputPath, { flag: 'a' })
//     // ws.once('open', () => {
//     //     console.log('开始了');
        
//     // })
//     // ws.write(JSON.stringify(fileResult))
//     // ws.end()
//     // ws.once('close', () => {
//     //     console.log('关闭了');
        
//     // })
// })



