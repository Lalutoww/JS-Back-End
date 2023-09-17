const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');

module.exports = (req, res) => {
   const pathname = url.parse(req.url).pathname;

   if (pathname === '/' && req.method === 'GET') {
      const filePath = path.normalize(
         path.join(__dirname, '../views/home/index.html')
      );
      /* path normalize - simplifies/resolves path EX:'C:\\temp\\\\foo\\bar\\..\\'=>'C:\\temp\\foo\\'
      path join - joins paths EX: '/foo', 'bar' => '/foo/bar' !!ALWAYS JOINS TO THE SECOND ARGUMENT
      __dirname - shows current module pathname =>this __dirname is: Cat Shelter/handlers */

      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (chunk) => {
         res.writeHead(200, { 'Content-Type': 'text/html' });

         const modifiedCats = cats
            .map(
               (cat) => `<li>
         <img
            src="${cat.imageURL}"
            alt="${cat.name}"
         />
         <h3>${cat.name} -> ${cat.id}</h3>
         <p><span>Breed: </span>${cat.breed}</p>
         <p>
            <span>Description: </span>${cat.description}
         </p>
         <ul class="buttons">
            <li class="btn edit">
               <a href="/editCat/${cat.id}">Change Info</a>
            </li>
            <li class="btn delete">
               <a href="/catShelter/${cat.id}">New Home</a>
            </li>
         </ul>
      </li>`
            )
            .join('');
         const modifiedData = chunk
            .toString()
            .replace('{{cats}}', modifiedCats);
         res.write(modifiedData);
         res.end();
      });
      readStream.on('error', (err) => {
         if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found!');
            res.end();
            return;
         }
      });
   } else {
      return true;
   }
};
