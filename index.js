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
                ...extractSongNames(require(`./data/${file}`)),
            ];
        });

    songNameArr
        .filter(isUnique)
        .filter(song => song.split(' - ').length === 2)
        .sort((a, b) => {
            const artistA = a.split(' - ')[0].toLowerCase();
            const artistB = b.split(' - ')[0].toLowerCase();

            if(artistA < artistB) return -1;
            if(artistA > artistB) return 1;
            return 0;
        })
        .forEach((line) => {
            writeStream.write(`${line}\r\n`);
        });

    writeStream.end();
});

loadData();



