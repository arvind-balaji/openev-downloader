# OpenEV Downloader
## Description
Quick utility to fetch and categorize all files from [Open Evidence](https://openev.debatecoaches.org).
## Usage
Run `npm install` inside the project directory to install all dependencies. Then run `npm start` to begin the downloader. Files will be put into `Download/` within the project directory. Files will automatically be put into the correct folder based on the tags given to it on OpenEV.
## Notes
The program uses `wget` to fetch files, it comes installed on linux and mac, but I have no idea if it works on windows.

Also, it can up to 10 minutes to complete depending on internet speed. Changing `.execSync` to `.exec` on line `5` of `app.js` will make it finish *significantly* faster - within ~30  seconds. However this isn't recommended as it doesn't appear to be very stable

## Known Bugs
* Files with '(' or ')' in their names fail to download. 
