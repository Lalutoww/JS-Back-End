const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const cats = require('../data/cats');
//REALLY BASIC SEARCH FUNCTION - LOT TO IMPROVE BUT RIGHT NOW DON'T HAVE TIME FOR IT
module.exports = (req, res) => {
   const pathname = url.parse(req.url).pathname;

   if (pathname === '/search' && req.method === 'POST') {
      const filePath = path.normalize(
         path.join(__dirname, '../views/home/index.html')
      );

      let formData = '';

      req.on('data', (data) => {
         formData += data; //data is query from the url
      });

      req.on('end', () => {
         const body = querystring.parse(formData);
         //parsing the query into js obj EX: 'foo=bar&abc=xyz&abc=123' is parsed into {foo: 'bar',abc: ['xyz', '123']}

         const readStream = fs.createReadStream(filePath);
         readStream.on('data', (chunk) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const filteredCats = cats.filter(obj=>obj['name'].toLowerCase().includes((body.search).toLowerCase()));
            const modifiedCats = filteredCats
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
      });
   } else {
      return true;
   }
};
