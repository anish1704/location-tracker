document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('itemForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const location = document.getElementById('location').value;
            const dateAdded = new Date().toLocaleString();
            
            const item = { name, location, dateAdded };
            
            let items = localStorage.getItem('items');
            if (items) {
                items = JSON.parse(items);
            } else {
                items = [];
            }
            items.push(item);
            
            localStorage.setItem('items', JSON.stringify(items));
            
            form.reset();
        });
    }

    if (window.location.pathname.endsWith('items.html')) {
        displayItems();
    }
});

function displayItems() {
    const itemsTableBody = document.querySelector('#itemsTable tbody');
    itemsTableBody.innerHTML = '';
    
    let items = localStorage.getItem('items');
    if (items) {
        items = JSON.parse(items);
        items.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.dateAdded}</td>
                <td><button onclick="deleteItem(${index})">Delete</button></td>
            `;
            itemsTableBody.appendChild(tr);
        });
    }
}

function deleteItem(index) {
    let items = localStorage.getItem('items');
    if (items) {
        items = JSON.parse(items);
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
    }
}
