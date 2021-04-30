const Router = require('express')
const fs = require('fs')
const path = require('path');
const router = new Router()

router.get('/script.component.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.component.js'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/script.updcomponent.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.updcomponent.js'));
        
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/script.seller.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.seller.js'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/script.updseller.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.updseller.js'));
        
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/script.customer.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.customer.js'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/script.updcustomer.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.updcustomer.js'));
        
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/script.food.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.food.js'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/script.updfood.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.updfood.js'));
        
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/component.add.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/component.add.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/component.update.html', (req, res) => {
    try {
        const name = req.query.name_component;
        const filePath = path.join(__dirname, '../views/component.update.html');
        const filePathSend = path.join(__dirname, '../views/component.update.one.html');

        fs.readFile(filePath, function(err, data) {
            if(err) throw err;
            data = data.toString();
            data = data.replace('<input id="3" type="text" name="name_component">', `<input id="3" type="text" name="name_component" value="${name}">`);
            //console.log(name);
            //console.log(data);
            fs.unlinkSync(filePathSend,  function(err){
                if(err) throw err;
            });
            fs.writeFileSync(filePathSend , data, function(err) {
            });
            res.sendFile(filePathSend);
        
            res.status(200);
        });

    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/seller.add.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/seller.add.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/seller.update.html', (req, res) => {
    try {
        const name = req.query.name;
        const surname = req.query.surname;
        const salary = req.query.salary;
        const filePath = path.join(__dirname, '../views/seller.update.html');
        const filePathSend = path.join(__dirname, '../views/seller.update.one.html');

        fs.readFile(filePath, function(err, data) {
            if(err) throw err;
            data = data.toString();
            data = data.replace('<input id="3" type="text" name="name">', `<input id="3" type="text" name="name" value="${name}">`);
            data = data.replace('<input id="4" type="text" name="suname">', `<input id="4" type="text" name="suname" value="${surname}">`);
            data = data.replace('<input id="5" type="number" name="salary">', `<input id="5" type="number" name="salary" value="${salary}">`);
            //console.log(name);
            //console.log(data);

            fs.unlinkSync(filePathSend,  function(err){
                if(err) throw err;
            });
            fs.writeFileSync(filePathSend , data, function(err) {
            });
            res.sendFile(filePathSend);
        
            res.status(200);
        });

    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/customer.add.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/customer.add.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/customer.update.html', (req, res) => {
    try {
        const name = req.query.name;
        const surname = req.query.surname;
        const salary = req.query.salary;
        const filePath = path.join(__dirname, '../views/customer.update.html');
        const filePathSend = path.join(__dirname, '../views/customer.update.one.html');

        fs.readFile(filePath, function(err, data) {
            if(err) throw err;
            data = data.toString();
            data = data.replace('<input id="3" type="text" name="name">', `<input id="3" type="text" name="name" value="${name}">`);
            data = data.replace('<input id="4" type="text" name="suname">', `<input id="4" type="text" name="suname" value="${surname}">`);
            //console.log(name);
            //console.log(data);

            fs.unlinkSync(filePathSend,  function(err){
                if(err) throw err;
            });
            fs.writeFileSync(filePathSend , data, function(err) {
            });
            res.sendFile(filePathSend);
        
            res.status(200);
        });

    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/food.add.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/food.add.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/food.update.html', (req, res) => {
    try {
        const name = req.query.name;
        const description = req.query.description;
        const price = req.query.price;
        const filePath = path.join(__dirname, '../views/food.update.html');
        const filePathSend = path.join(__dirname, '../views/food.update.one.html');

        fs.readFile(filePath, function(err, data) {
            if(err) throw err;
            data = data.toString();
            data = data.replace('<input id="3" type="text" name="name">', `<input id="3" type="text" name="name" value="${name}">`);
            data = data.replace('<input id="4" type="text" name="description">', `<input id="4" type="text" name="description" value="${description}">`);
            data = data.replace('<input id="5" type="number" name="price">', `<input id="5" type="number" name="price" value="${price}">`);
            //console.log(name);
            //console.log(data);

            fs.unlinkSync(filePathSend,  function(err){
                if(err) throw err;
            });
            fs.writeFileSync(filePathSend , data, function(err) {
            });
            res.sendFile(filePathSend);
        
            res.status(200);
        });

    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/jquery.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/jquery.js'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});
router.get('/style.css', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../css/style.css'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/index.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/food.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'food.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/seller.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'seller.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

router.get('/component.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'component.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});


router.get('/customer.html', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'customer.html'));
        res.status(200);
    }
    catch (ex) {
        res.status(400);
        console.log(ex);
    }
});

module.exports = router