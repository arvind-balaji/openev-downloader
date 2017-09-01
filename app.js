const osmosis = require('osmosis');
var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;
var files = [];

exec("rm -rf ./Download");

osmosis
    .get('https://openev.debatecoaches.org')
    .find('#FileTable')
    .find('tr')
    .set({
       'url': osmosis.select('td:nth-child(1) > div > p > span a > @href'),
       'name': osmosis.select('td:nth-child(1) > div > p > span > a'),
       'cat': 'td:nth-child(3) > div > p',
    })
    .data(function(data) {
        files.push(data);
    })
    .done(function() {
        var count = 0;
        for (var file of files){
            if (file.cat) {
                for (var cat of file.cat.split(",")){
                    exec("wget --no-check-certificate -P ./Download/"+cat+"/ "+ encodeURI(file.url));
                    console.log("Fetching... File#: "+ count  +" | "+ file.name +" | "+ encodeURI(file.url) +" | "+ cat)
                }
            }
            count ++;
        }
        console.log(count + " files successfuly fetched and sorted!")
    })
