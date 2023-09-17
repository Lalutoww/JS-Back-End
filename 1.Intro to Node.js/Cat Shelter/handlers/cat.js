const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const cats = require('../data/cats');
const breeds = require('../data/breeds');

module.exports = (req, res) => {
   const pathname = url.parse(req.url).pathname;

   if (pathname === '/addCat' && req.method === 'GET') {
      const filePath = path.normalize(
         path.join(__dirname, '../views/addCat.html')
      );
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (chunk) => {
         res.writeHead(200, { 'Content-Type': 'text/html' });
         const catBreedPlaceholder = breeds
            .map((breed) => `<option value="${breed}">${breed}</option>`)
            .join(''); //using join to remove ','
         /*breeds is the json file which already has all data from addBreed and 
         transforms every element into an option tag which will be added 
         into the html using the template*/
         const modifiedData = chunk
            .toString()
            .replace(`{{catBreeds}}`, catBreedPlaceholder);
         //Chunk is the html file --> addCat.html and we replace the template we created with the modifiedData
         res.write(modifiedData);
         res.end();
      });
      readStream.on('error', (err) => {
         console.log(err);
         res.writeHead(404, { 'Content-Type': 'text/plain' });
         res.write('404 Not Found!');
         res.end();
      });
   } else if (pathname === '/addBreed' && req.method === 'GET') {
      const filePath = path.normalize(
         path.join(__dirname, '../views/addBreed.html')
      );
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (chunk) => {
         res.writeHead(200, { 'Content-Type': 'text/html' });
         res.write(chunk);
         res.end();
      });
      readStream.on('error', (err) => {
         console.log(err);
         res.writeHead(404, { 'Content-Type': 'text/plain' });
         res.write('404 Not Found!');
         res.end();
         return;
      });
   } else if (pathname === '/addBreed' && req.method === 'POST') {
      let formData = '';

      req.on('data', (data) => {
         formData += data; //data is query from the url
      });

      req.on('end', () => {
         const body = querystring.parse(formData);
         //parsing the query into js obj EX: 'foo=bar&abc=xyz&abc=123' is parsed into {foo: 'bar',abc: ['xyz', '123']}

         const filePath = path.normalize(
            path.join(__dirname, '../data/breeds.json')
         );

         const readStream = fs.createReadStream(filePath);
         readStream.on('data', (chunk) => {
            const breeds = JSON.parse(chunk);
            breeds.push(body.breed);
            const json = JSON.stringify(breeds);

            fs.writeFile(filePath, json, 'utf-8', () =>
               console.log('The breed has been added')
            );
         });

         readStream.on('error', (err) => {
            throw err;
         });

         res.writeHead(302, { location: '/' }); //302 code means a specific URL has been moved temporarily to a new location
         res.end();
      });
   } else if (pathname === '/addCat' && req.method === 'POST') {
      let formData = '';
      req.on('data', (data) => {
         formData += data;
      });
      req.on('end', () => {
         const body = querystring.parse(formData);
         const filePath = path.normalize(
            path.join(__dirname, '../data/cats.json')
         );

         const readStream = fs.createReadStream(filePath);
         readStream.on('data', (chunk) => {
            const cats = JSON.parse(chunk);
            const id = cats.length === 0 ? 1 : cats[cats.length-1].id + 1;
            cats.push({
               name: body.name,
               description: body.description,
               imageURL: body.image,
               breed: body.breed,
               id
            });
            const json = JSON.stringify(cats);

            fs.writeFile(filePath, json, 'utf-8', () =>
               console.log('The cat has been added')
            );
         });

         readStream.on('error', (err) => {
            throw err;
         });

         res.writeHead(302, { location: '/' }); //302 code means a specific URL has been moved temporarily to a new location
         res.end();
      });
   } else if (pathname.includes('/editCat') && req.method === 'GET') {
      //Display edit cat page
      const filePath = path.normalize(
         path.join(__dirname, '../views/editCat.html')
      );

      const readStream = fs.createReadStream(filePath);

      readStream.on('data', (chunk) => {
         res.writeHead(200, { 'Content-Type': 'text/html' });
         const id = Number(pathname.substring(pathname.lastIndexOf('/') + 1));
         //HELPS MOVE BREED TO THE FIRST PLACE SO WHEN YOU EDIT A CAT YOU ALWAYS SEE CAT'S BREED
         const index = breeds.indexOf(cats[cats.findIndex(x => x.id === id)].breed);
         breeds.unshift(breeds.splice(index, 1)[0]);
         const catBreedPlaceholder = breeds
            .map((breed) => `<option value="${breed}">${breed}</option>`)
            .join(''); //using join to remove ','
         const modifiedData = chunk
            .toString()
            .replace('{{catBreeds}}', catBreedPlaceholder)
            .replace('{{image}}', cats[cats.findIndex(x => x.id === id)].imageURL)
            .replace('{{catName}}', cats[cats.findIndex(x => x.id === id)].name)
            .replace('{{description}}', cats[cats.findIndex(x => x.id === id)].description);
         res.write(modifiedData);
         res.end();
      });
      readStream.on('error', (err) => {
         console.log(err);
         res.writeHead(404, { 'Content-Type': 'text/plain' });
         res.write('404 Not Found!');
         res.end();
         return;
      });
   } else if (pathname.includes('/editCat') && req.method === 'POST') {
      let formData = '';
      req.on('data', (data) => {
         formData += data;
      });
      req.on('end', () => {
         const body = querystring.parse(formData);
         const filePath = path.normalize(
            path.join(__dirname, '../data/cats.json')
         );

         const readStream = fs.createReadStream(filePath);
         readStream.on('data', (chunk) => {
            const cats = JSON.parse(chunk);
            const id = Number(pathname.substring(pathname.lastIndexOf('/') + 1));
            cats[cats.findIndex(x => x.id === id)] = {
               name: body.name,
               description: body.description,
               imageURL: body.image,
               breed: body.breed,
               id: id,
            };
            const json = JSON.stringify(cats);
            fs.writeFile(filePath, json, 'utf-8', () =>
               console.log('The cat has been updated')
            );
         });
         readStream.on('error', (err) => {
            throw err;
         });

         res.writeHead(302, { location: '/' }); //302 code means a specific URL has been moved temporarily to a new location
         res.end();
      });
   } else if (pathname.includes('/catShelter') && req.method === 'GET') {
      const filePath = path.normalize(
         path.join(__dirname, '../views/catShelter.html')
      );
      const readStream = fs.createReadStream(filePath);

      readStream.on('data', (chunk) => {
         res.writeHead(200, { 'Content-Type': 'text/html' });
         const id = Number(pathname.substring(pathname.lastIndexOf('/') + 1));
         const currentCat = cats[cats.findIndex(x => x.id === id)];
         const modifiedData = chunk
            .toString()
            .replace('{{catName}}', currentCat.name)
            .replace('{{description}}', currentCat.description)
            .replace('{{catBreed}}', `<option value="${currentCat.breed}">${currentCat.breed}</option>`)
            .replace('{{imageURL}}', currentCat.imageURL);
         res.write(modifiedData)
         res.end();
      });
      readStream.on('error', (err) => {
         throw err;
      });
   } else if (pathname.includes('/catShelter') && req.method === 'POST') {
      let formData = '';
      req.on('data', (data) => {
         formData += data;
      });
      
      req.on('end', () => {
         const filePath = path.normalize(
            path.join(__dirname, '../data/cats.json')
         );

         const readStream = fs.createReadStream(filePath);
         readStream.on('data', (chunk) => {
            const catsData = JSON.parse(chunk);
            const id = Number(pathname.substring(pathname.lastIndexOf('/') + 1));
            const deletedElement = catsData.splice(cats.findIndex(x => x.id === id),1);
            const json = JSON.stringify(catsData);
            fs.writeFile(filePath, json, 'utf-8', () =>
               console.log('The cat has been sheltered')
            );
         });
         readStream.on('error', (err) => {
            throw err;
         });

         res.writeHead(302, { location: '/' }); //302 code means a specific URL has been moved temporarily to a new location
         res.end();
      });
   } else {
      return true;
   }
};
