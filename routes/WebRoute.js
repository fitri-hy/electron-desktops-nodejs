const express = require('express');
const router = express.Router();
const { initDatabase, getData } = require('../db/connection');

async function ensureDatabaseInitialized(req, res, next) {
    await initDatabase();
    next();
}

router.use(ensureDatabaseInitialized);

router.get('/', (req, res) => {
    res.render('index', { 
		title: 'Home Page',
	});
});

router.get('/db-example', (req, res) => {
    const data = getData();
    res.render('db-example', { 
		data,
		title: 'Database'
	});
});

module.exports = router;
