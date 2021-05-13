const fs = require('fs');
const path = require('path');
const DomParser = require('dom-parser');
const parser = new DomParser();
const builder = require('xmlbuilder');
const XMLpath = path.join(__dirname, './time.xml');
const XMLpath2 = path.join(__dirname, './time2.xml');
const xml2js = require('xml2js');   
const xparser = new xml2js.Parser();
const xbuilder = new xml2js.Builder();
var Serializer = require("damn-simple-xml");  // constructor
var dsx = new Serializer();

var name = "ret"
function writeTime (req, res) {
    const atr = req.query.atr;
    const text = req.query.text;
  //  console.log(atr);
  if(fs.existsSync(XMLpath)) {
    fs.unlinkSync(XMLpath);
  }
    if(!fs.existsSync(XMLpath)) {
        var xml = builder.create('root').ele('first').text(atr).att('sec', 'der').end({ pretty: true});
    }
    //console.log(xml);
    var doc = parser.parseFromString(xml);
    fs.writeFileSync(XMLpath, xml);
    //doc.getElementsByTagName("first")[0].attributes.push('csdcdsdcs', 'sdcsdc');
    //console.log(doc);
    console.log(doc.getElementsByTagName("first")[0].childNodes[0].textContent);

    //  var cards = parser.parseFromString(xml).getElementsByTagName("first").children;
    //     for (var i = 0; i < cards; i++) {
    //      console.log(cards[i]);
    //      }

    // fs.readFile( 'XMLpath' , function(err, data) {
    //     parser.parseString(data, function (err, result) {
    //         console.dir(result.note.to[0]);
    //     });
    // });
   
    var out = fs.createWriteStream(XMLpath2);

    dsx.deserialize(fs.createReadStream(XMLpath), function(err, root) {
        if (err) {
            console.log(err);
            return;
        }
        dsx.serialize({
            name: "n",
            data: root.data
        }, 
        function(err, xmlpart, level) {
            if (err) {
                console.log(err);
                return;
            }
            out.write(xmlpart);
            if (level === 0) { // XML streaming done
                out.end(); // closes the stream.
            }
        });
    });

    //console.log(doc1.getElementsByTagName('first')[0].toString());
    //console.log(doc1);
    res.json(doc);


}



function renderTime() {

}

module.exports = {
    writeTime, renderTime
}