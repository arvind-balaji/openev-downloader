const osmosis = require('osmosis');
var http = require('http');
var fs = require('fs');
var request = require('request');
var exec = require('child_process').execSync;
var download = require('download-file')
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
	.data(function (data) {
		files.push(data);
	})
	.done(function () {
		var count = 0;
		for (var file of files) {
			if (file.cat) {
				for (var cat of file.cat.split(",")) {
                    var execStr = "wget --timeout 20000 --no-check-certificate -P ./Download/" + cat.replace(" ", "_") + "/ " + encodeURI(file.url)
                    try {
                        exec(execStr)
                    } catch (err) {
                        err.stdout;
                        err.stderr;
                        err.pid;
                        err.signal;
                        err.status;
                        count--;
                        break;
                    }
				}
			}
    		count++;
		}
		console.log(count + " files successfuly fetched and sorted!")
	})
