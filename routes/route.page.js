const Router = require('express')
const path = require('path');
const router = new Router()

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
router.get('/script.js', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../scripts/script.js'));
        res.status(200);
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

module.exports = router