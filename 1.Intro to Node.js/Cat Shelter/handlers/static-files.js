const url = require('url');
const path = require('path');
const fs = require('fs');

function getContentType(url) {
   if (url.endsWith('html')) {
      return { 'Content-Type': 'text/html' };
   } else if (url.endsWith('css')) {
      return { 'Content-Type': 'text/css' };
   } else if (url.endsWith('js')) {
      return { 'Content-Type': 'application/javascript' };
   } else if (url.endsWith('png')) {
      return { 'Content-Type': 'image/png' };
   } else if (url.endsWith('jpeg')) {
      return { 'Content-Type': 'image/jpeg' };
   }else if (url.endsWith('ico')){
    return {'Content-Type': 'image/x-icon'}
   }
}

module.exports = (req, res) => {
   const pathname = url.parse(req.url).pathname;

   if (pathname.startsWith('/content') && req.method === 'GET') {
      //our files are located in /content folder, that's why filtering only by that works
      const folderUp = path.join(__dirname, '../');
      const filePath = path.normalize(path.join(folderUp, pathname));

      fs.readFile(filePath, (err, data) => {
         if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found!');
            res.end();
            return;
         }
             res.writeHead(200, getContentType(pathname));
             res.write(data);
         res.end();
      });
   } else {
      return true;
   }
};
