const { argv } = require("yargs");
const { connectEWS } = require("./src/exo");
const { connectMsOnline } = require("./src/msoid");
const { connectSPO } = require("./src/spo");
const chalk = require('chalk')
main()

async function main () {

if (!argv.u || !argv.p) {
    var msg = chalk.yellow('missing arguments username / password \r\n example: node main.js -u="jose@dewi.red" -p="cat" ')
    console.log(msg)
    return;
}

   await connectMsOnline(argv.u, argv.p).catch(error => console.log(error))
 
   await connectSPO(argv.u, argv.p).catch(error => console.log(error))

   await connectEWS(argv.u, argv.p).catch(error => console.log(error))


}