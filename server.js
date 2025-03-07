const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json()); 

let items = [
    { id: 1, name: 'item 1', price: 'Rp 1.000.000', stock: 5 },
    { id: 2, name: 'item 2', price: 'Rp 2.000.000', stock: 2 },
    { id: 3, name: 'item 3', price: 'Rp 2.500.000', stock: 420 },
    { id: 4, name: 'item 4', price: 'Rp 3.200.000', stock: 69 },
    { id: 5, name: 'item 5', price: 'Rp 4.800.000', stock: 123 }
];

// Endpoint untuk mendapatkan data
app.get('/api/data', (req, res) => {
    res.json({
        message: 'Daftar Items :',
        items: items
    });
});

// Endpoint untuk menambah data
app.post('/api/data', (req, res) => {
    const { name, price, stock } = req.body;
    const newItem = {
        id: items.length + 1,
        name,
        price,
        stock
    };
    items.push(newItem);
    res.status(201).json({ message: 'Item berhasil ditambahkan', newItem });
});

// Endpoint untuk memperbarui data
app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const itemIndex = items.findIndex(item => item.id === parseInt(id));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    items[itemIndex] = { id: parseInt(id), name, price, stock };
    res.json({ message: 'Item berhasil diperbarui', updatedItem: items[itemIndex] });
});

// Endpoint untuk menghapus data
app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;

    const itemIndex = items.findIndex(item => item.id === parseInt(id));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    const deletedItem = items.splice(itemIndex, 1);
    res.json({ message: 'Item berhasil dihapus', deletedItem });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
