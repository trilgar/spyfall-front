const express = require('express');

const app = express();

app.use(express.static('./dist/spyfall-front'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/spyfall-front/'}),
);

app.listen(process.env.PORT || 8080);
