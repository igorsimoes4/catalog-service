const mongoose = require('mongoose');
const faker = require('faker');
const Book = require('../models/Book');  // Supondo que você tenha um modelo de livro em models/Book.js

require('dotenv').config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar MongoDB:', err));

// Função para gerar livros fakes
const generateFakeBooks = (n) => {
    const books = [];
    for (let i = 0; i < n; i++) {
        books.push({
            title: faker.lorem.words(3),
            author: faker.name.findName(),
            description: faker.lorem.sentences(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl(),
            rating: faker.random.number({ min: 1, max: 5 }),
            category: faker.commerce.department(),
        });
    }
    return books;
};

// Função para salvar livros no banco de dados
const saveBooks = async () => {
    const fakeBooks = generateFakeBooks(10); // Gerando 10 livros fakes
    try {
        const result = await Book.insertMany(fakeBooks);
        console.log('Livros salvos:', result);
        mongoose.connection.close();
    } catch (err) {
        console.error('Erro ao salvar livros:', err);
        mongoose.connection.close();
    }
};

// Executar a função de salvar livros
saveBooks();
