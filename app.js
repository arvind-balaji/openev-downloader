const osmosis = require('osmosis');
var Xray = require('x-ray')
var http = require('http');
var fs = require('fs');
var download = require('download-file')
var x = Xray()
var exec = require('child_process').exec;
var files = [];
osmosis
    .get('https://openev.debatecoaches.org')
    .find('#FileTable')
    .find('tr')
    .set({
       'url': osmosis.select('td:nth-child(1) > div > p > span a > @href'),
       'name': osmosis.select('td:nth-child(1) > div > p > span > a'),
       'cat': 'td:nth-child(3) > div > p',
    })   // get table
    .data(function(data) {
        //console.log(data);
        files.push(data);
    })
    .done(function() {
        //console.log(files);
        count = 0;
        for (var file of files){
            if (file.cat) {
                for (var cat of file.cat.split(",")){
                    var options = {
                        directory: "./downloads/"+cat+"/",
                        filename: file.name
                    }

                    exec("wget --no-check-certificate -P ./Download/"+cat+"/ "+ encodeURI(file.url));
                    console.log(count + file.name +" _ "+ encodeURI(file.url) +" _ "+ cat)
                }
            }

            count++;
        }
    })
