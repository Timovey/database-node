const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, '../views/delete.html')
const filePathSend = path.join(__dirname, '../views/delete.one.html')
class deleteResponse {

    makeDeleteFile(nameContr) {
        fs.readFile(filePath, function(err, data) {
            //console.log(nameContr);
            if(err) throw err;
            data = data.toString();
            data = data.replace('<a>Ок</a>', `<a href="http://localhost:8000/page/${nameContr}.html">Ок</a>`);
            console.log("sd121312312");
            //console.log(data);
            fs.unlinkSync(filePathSend,  function(err){
                if(err) throw err;
            });
            fs.writeFileSync(filePathSend , data, function(err) {
            });
        });
    }
    
}



module.exports = new deleteResponse()