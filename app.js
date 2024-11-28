const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');

// Carregar variáveis de ambiente
dotenv.config();

// Iniciar o servidor Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Roteamento para livros
app.use('/api/books', bookRoutes);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => {
        console.error('Erro ao conectar MongoDB:', err);
        process.exit(1); // Encerra o processo caso falhe a conexão com o banco
    });

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

// Configuração da porta
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
