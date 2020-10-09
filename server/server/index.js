const app = require('../main');
const server = require('http').createServer(app);

const PORT = process.env.PORT || '8091';

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
