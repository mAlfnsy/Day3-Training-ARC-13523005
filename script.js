document.getElementById('add-item-form').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const stock = document.getElementById('item-stock').value;

    const newItem = { name, price, stock };

    try {
        const response = await fetch('http://localhost:3000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        const data = await response.json();
        alert(data.message);
        fetchLocalData();

        document.getElementById('add-item-form').reset();
    } catch (error) {
        console.error('Error adding item:', error);
    }
});

async function fetchLocalData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        const container = document.getElementById('local-data');
        container.innerHTML = ''; 

        const message = document.createElement('h3');
        message.textContent = data.message;
        container.appendChild(message);

        const cardContainer = document.createElement('div');
        cardContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

        data.items.forEach(item => {
            const card = document.createElement('div');
            card.style.border = '1px solid #ddd';
            card.style.borderRadius = '10px';
            card.style.padding = '15px';
            card.style.background = 'white';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            card.style.margin = '20px auto';

            const title = document.createElement('h3');
            title.textContent = item.name;

            const price = document.createElement('p');
            price.textContent = `Harga: ${item.price}`;

            const stock = document.createElement('p');
            stock.textContent = `Stok: ${item.stock}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.onclick = () => deleteItem(item.id);

            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(stock);
            card.appendChild(deleteButton);
            cardContainer.appendChild(card);
        });

        container.appendChild(cardContainer);
    } catch (error) {
        document.getElementById('local-data').textContent = 'Gagal mengambil data lokal';
        console.error('Error fetching local data:', error);
    }
}

async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/data/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        alert(data.message);
        fetchLocalData();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
