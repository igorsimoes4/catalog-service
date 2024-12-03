const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/search', bookController.getBooksByIds);
router.get('/:id', bookController.getBookById);
router.delete('/:id', bookController.deleteBook);
router.get('/pesquisa', bookController.searchBooks);
router.post('/pesquisa', bookController.searchBooks);

module.exports = router;
