const router = require('express').Router();
const controller = require('./controller');

//sign up
router.post('/register', (req, res) => {
	controller.createUser(req, res);
});

//sign in
router.post('/login', (req, res) => {
	controller.login(req, res);
});

//get user info with id
router.get('/getUser/:id', (req, res) => {
	controller.getUser(req, res);
})

module.exports = router;
