const fs = require('fs');

const BUILD_ID = fs.readFileSync('.next/BUILD_ID', 'utf8');
const buildManifestJson = JSON.parse(fs.readFileSync('.next/build-manifest.json', 'utf8'));
const pagesPath = `.next/static/${BUILD_ID}/pages/`;

let indexPaths = fs.readdirSync(pagesPath)
  .filter(input => ['_app.js', '_error.js', 'index.js'].includes(input))
  .map(input => `${pagesPath}${input}`);
let allPaths = fs.readdirSync(pagesPath)
  .map(input => `${pagesPath}${input}`)
buildManifestJson.pages['/'].forEach(element => {
  allPaths.push(`.next/${element}`);
  indexPaths.push(`.next/${element}`);
});

module.exports = [
  {
    name: 'Index page size',
    limit: '123 KB',
    webpack: false,
    path: indexPaths
  },
  {
    name: 'Total size',
    limit: '123 KB',
    webpack: false,
    path: allPaths
  }
]
