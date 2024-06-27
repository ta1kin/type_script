const userController = require('../controllers/userController');
const express = require('express');

 
const router = express.Router();

router.get( '/users/me', userController.getUserInfo );

router.post( '/autorization', userController.autorizationUser );

router.post( '/registration', userController.regUser );

router.get('/books', userController.getAllBooks);

router.get('/books/:id', userController.getBookByID);

router.post('/books', userController.addBook);

router.put('/books/:id', userController.updateBook);

router.delete('/books/:id', userController.deleteBook);

router.put('/users/:id/role', userController.changeRole);

module.exports = router;
