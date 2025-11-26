const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Inicializar banco de dados
const db = new sqlite3.Database('./eventos.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite');
    }
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    data_evento DATE NOT NULL,
    mensagem TEXT,
    status TEXT DEFAULT 'pendente',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
    } else {
        console.log('✅ Tabela eventos pronta');
    }
});

// Rotas da API

// Listar todos os eventos
app.get('/api/eventos', (req, res) => {
    db.all('SELECT * FROM eventos ORDER BY data_evento', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Buscar eventos por mês
app.get('/api/eventos/mes/:ano/:mes', (req, res) => {
    const { ano, mes } = req.params;
    db.all(`
      SELECT * FROM eventos 
      WHERE strftime('%Y', data_evento) = ? 
      AND strftime('%m', data_evento) = ?
      ORDER BY data_evento
    `, [ano, mes.padStart(2, '0')], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Criar novo evento
app.post('/api/eventos', (req, res) => {
    const { nome, email, telefone, data_evento, mensagem } = req.body;

    if (!nome || !email || !telefone || !data_evento) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    db.run(`
      INSERT INTO eventos (nome, email, telefone, data_evento, mensagem)
      VALUES (?, ?, ?, ?, ?)
    `, [nome, email, telefone, data_evento, mensagem], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            message: 'Evento criado com sucesso!'
        });
    });
});

// Atualizar status do evento
app.put('/api/eventos/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.run('UPDATE eventos SET status = ? WHERE id = ?', [status, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Status atualizado com sucesso!' });
    });
});

// Deletar evento
app.delete('/api/eventos/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM eventos WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Evento deletado com sucesso!' });
    });
});

// Verificar disponibilidade de data
app.get('/api/disponibilidade/:data', (req, res) => {
    const { data } = req.params;

    db.get(`
      SELECT * FROM eventos 
      WHERE data_evento = ? 
      AND status != 'cancelado'
    `, [data], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            disponivel: !row,
            evento: row || null
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log('Backend Melodia do Sim - Versão 1.1 - Deploy Forçado');
});
