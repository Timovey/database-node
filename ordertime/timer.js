const fs = require('fs');
const path = require('path');
const DomParser = require('dom-parser');
const parser = new DomParser();
const builder = require('xmlbuilder');
const XMLpath = path.join(__dirname, './time.xml');
var name = "ret"
function writeTime (req, res) {
    fs.unlinkSync(XMLpath);
    if(!fs.existsSync(XMLpath)) {
        var xml = builder.create('root').end({ pretty: true});;
    }
    
    console.log(xml);
    fs.writeFileSync(XMLpath, xml);
    

    var doc1 = parser.parseFromString(xml);

    //console.log(doc1);
    res.json(doc1);

}

function renderTime() {

}

module.exports = {
    writeTime, renderTime
}