const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const plivo = require('plivo');
const path = require('path');
const cors = require('cors');

const username = '';
const password = '';
const client = new plivo.Client(
  `${username}`,
  `${password}`
);
const app = express();
const port = 5000;
app.use(cors());
app.use(
  bodyParser.raw({
    limit: '2mb', // You can adjust the limit
    type: req => {
      // validate that we're receiving the right kind of content
      return (
        req.headers['content-type'].startsWith('image/') ||
        req.headers['content-type'] === 'application/pdf'
      );
    },
  })
);

app.post('/upload', (req, res) => {
  // Here, the req.body will have the raw binary content of the file

  // Create a unique filename
  const filename = path.join(
    __dirname,
    'tmp',
    Date.now() + '-' + req.headers['x-file-name']
  );
  if (!fs.existsSync(path.join(__dirname, 'tmp'))) {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  }
  fs.writeFileSync(filename, req.body);
  //   console.log(media);
  client.media
    .upload([filename])
    .then(function (media) {
      console.log('\n============ response ===========\n', media);
      res.json({ mediaUrl: media.objects[0].mediaUrl });
    })
    .catch(function (error) {
      console.log('\n============ Error :: ===========\n', error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
