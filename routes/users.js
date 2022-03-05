//external middleware
const express = require('express');
const localsHandler = require('../middleware/common/localsHandler');
const addUser = require('../middleware/usersHandler/addUser');
const avatarUpload = require('../middleware/usersHandler/avatarUpload');
const users = require('../middleware/usersHandler/users');
const {validateCheck,validationResults} = require('../middleware/usersHandler/validateCheck');
const router = express.Router();

router.get('/',localsHandler,users);

router.post('/',avatarUpload,validateCheck,validationResults,addUser);

module.exports = router;