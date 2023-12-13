const express = require('express');
const server = express();
 
function keepAlive() {
  server.listen(3000, () => { console.log("asumakina we " + Date.now()) });
}
 
module.exports = keepAlive;