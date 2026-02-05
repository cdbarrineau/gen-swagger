const express = require('express');
const axios = require('axios');
const fs = require('fs');
const { execSync } = require('child_process');
const AdmZip = require('adm-zip');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

/**
 * UI calls this to get the swagger JSON.  We'll just
 * pass it through to the UI.
 * 
 */
app.get('/generate', async (req, res, next) => {
  try {
    const resp = await axios.get('http://localhost:8080/v3/api-docs');

    const data = await resp.data;

    res.json(data);
  }
  catch (e) {
    res.status(500).json(JSON.stringify(e));
  }
});

app.post('/write-swagger', async (req, res, next) => {

  const swaggerFile = req.body.swaggerFile;
  const tsFile = req.body.tsFile;

  try {
    fs.writeFileSync(swaggerFile, req.body.data);

    console.info('Swagger file written.');

    const tsDir = './ts/api';

    const cmd = 'npx swagger-typescript-api generate --path ./' +
            swaggerFile + 
            ' --output ./ts/api --name ' + 
            tsFile + 
            ' --axios';

    try {
      execSync(cmd);

      console.info('TypeScript file written.');

      // Create and return a zip.
      const zip = new AdmZip();

      zip.addLocalFile(path.join(__dirname, swaggerFile));
      // zip.addLocalFile(path.join(__dirname, 'file2.json'));
      zip.addLocalFolder(path.join(__dirname, tsDir));

      const zipContent = zip.toBuffer();

      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="archive.zip"',
        'Content-Length': zipContent.length
      });

      res.end(zipContent);
    }
    catch (e) {
      console.error('Error writing typescript file: ', e);

      res.status(500).json(JSON.stringify(e));
    }
  }
  catch (e) {
    console.error('Error writing swagger file: ', e);

    res.status(500).json(JSON.stringify(e));
  }

  // fs.writeFile(swaggerFile, req.body.data, 'utf8', (err) => {
  //   if (err) {
  //     console.error('Error writing file: ', err);
  //   }
  //   else {
  //     console.info('Swagger file written.');

  //     // const cmd = 'npx swagger-typescript-api generate --path ./test-swagger.json --output ./ts/api --name my-data.ts --axios';

      // const cmd = 'npx swagger-typescript-api generate --path ./' +
      //             swaggerFile + 
      //             ' --output ./ts/api --name ' + 
      //             tsFile + 
      //             ' --axios';

  //     exec(cmd, (err, stdout, stderr) => {
  //       if (err) {
  //         console.error('Error generating typescript: ', err);
  //       }
  //       else {
  //         console.info('Typescript file written.');

  //         const zipContent = getZip(swaggerFile, '/ts/api');

  //         console.info('Zip content: ', zipContent);
  //       }
  //     });
  //   }
  // });

  // res.end();
});
