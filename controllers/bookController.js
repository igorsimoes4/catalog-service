const Book = require('../models/Book');

// Cadastrar Livro
exports.createBook = async (req, res) => {
    try {
        const { title, author, description, price, rating, category, image } = req.body;

        const newBook = new Book({
            title, author, description, price, image, rating, category
        });

        const savedBook = await newBook.save();
        res.status(200).json({ success: true, message: 'Livro cadastrado com sucesso!', book: savedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao cadastrar livro', error: error.message });
    }
};

// Listar todos os livros
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar livros' });
    }
};

// Buscar livro por ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ success: false, message: 'Livro não encontrado' });
        res.status(200).json({ success: true, book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar livro' });
    }
};

// Deletar livro
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ success: false, message: 'Livro não encontrado' });
        res.status(200).json({ success: true, message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao deletar livro' });
    }
};

exports.getBooksByIds = async (req, res) => {
    const { ids } = req.query;
    console.log("IDs recebidos:", ids);
    if (!ids) {
        console.error("Erro: IDs não fornecidos");
        return res.status(400).json({ message: 'IDs não fornecidos' });
    }

    try {
        const books = await Book.find({ _id: { $in: ids.split(',') } });

        console.log("Livros encontrados:", books);

        res.status(200).json({ success: true, books });
    } catch (error) {
        console.error("Erro ao buscar livros por IDs:", error);
        res.status(500).json({ message: 'Erro ao buscar livros por IDs', error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    const { query } = req.body;
    console.log('Parâmetro de busca recebido:', query);  // Verifique o valor do query

    // Verificar se a query não foi fornecida
    if (!query) {
        return res.status(400).json({ success: false, message: 'Termo de pesquisa não fornecido.' });
    }

    try {
        console.log('Buscando livros no banco de dados...');
        
        // Use regex para permitir correspondência parcial
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        // Se não encontrar livros, retorna um array vazio
        if (books.length === 0) {
            console.log('Nenhum livro encontrado.');
            return res.json({ success: true, books: [] });
        }

        console.log('Livros encontrados:', books);
        res.json({ success: true, books });
    } catch (error) {
        // Log do erro completo
        console.error('Erro ao buscar livros no banco:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar livro',
            error: error.message
        });
    }
};






