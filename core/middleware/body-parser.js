core.bodyParser = require('body-parser');

core.server.use(core.bodyParser.urlencoded({
  extended: false
}));
core.server.use(core.bodyParser.json());
