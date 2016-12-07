const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream('output.txt');
let songNameArr = [];

const playlistId = 'UUWMhd2D6em-gXfIpVmOqeig';

const extractSongNames = (data =>
    data[0]
        .map(item => item[0][0])
        .filter(item => item[3].match(`list=${playlistId}`))
        .map(item => item[0])
        .map(song => song.split(' - YouTube')[0]));


const isUnique = ((value, index, arr) => arr.indexOf(value) === index);

const loadData = (() => {
    fs
        .readdirSync('./data')
        .forEach((file) => {
            songNameArr = [
                ...songNameArr,
                extractSongNames(require(`./data/${file}`)),
            ];
        });

    songNameArr
        .reduce((a,b) => a.concat(b))
        .filter(isUnique)
        .forEach((line) => {
            writeStream.write(`${line}\n\r`);
        });

    writeStream.end();
});

loadData();



