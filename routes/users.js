//external middleware
const express = require('express');
const localsHandler = require('../middleware/common/localsHandler');
const avatarUpload = require('../middleware/usersHandler/avatarUpload');
const users = require('../middleware/usersHandler/users');
const {validateCheck,validationResults} = require('../middleware/usersHandler/validateCheck');
const router = express.Router();

router.get('/',localsHandler,users);

router.post('/',avatarUpload,validateCheck,validateCheck,validationResults);

module.exports = router;