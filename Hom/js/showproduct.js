document.addEventListener('DOMContentLoaded', () => {
    let products = [
        { name: 'หมู', image: 'https://www.pitchameat.com/wp-content/uploads/2023/03/Mainsite-4.webp', daysLeft: 0, date: '31 Jul 2025', id: '332798147', status: 'Expired', statusClass: 'status-expired', statusTextClass: 'status-expired-text' },
        { name: 'ไข่ไก่', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkGNK7Xgpp0_Kk9v1SHlCFxEO4Jl6crqCwg&s', daysLeft: 1, date: '2 Aug 2025', id: '887902578', status: 'Expiring Soon', statusClass: 'status-soon', statusTextClass: 'status-soon-text' },
        { name: 'ไก่', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsWuJj0RLHOmGR5hlgq9Ij3pV0XjRfQ84CjyXPcnW7gxw7DXV0tM8mSKQxF61NpNYXXto&usqp=CAU', daysLeft: 9, date: '10 Aug 2025', id: '241812347', status: 'Fresh', statusClass: 'status-fresh', statusTextClass: 'status-fresh-text' }
    ];

    const productList = document.getElementById('productList');
    const deleteModal = document.getElementById('deleteModal');
    const editModal = document.getElementById('editModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const editForm = document.getElementById('editForm');
    
    let productToDeleteId = null;

    function renderProducts(productArray) {
        productList.innerHTML = '';
        productArray.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            const daysText = product.daysLeft <= 0 ? 'Expired' : `${product.daysLeft} days left`;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <p class="product-name">${product.name}</p>
                    <div class="product-meta">
                        <span class="material-icons">calendar_today</span>
                        <span>${product.date}</span>
                    </div>
                    <div class="product-meta">
                        <span>ID:</span>
                        <span>${product.id}</span>
                    </div>
                </div>
                <div class="product-status">
                    <span class="status-label ${product.statusClass}">
                        ${daysText}
                    </span>
                    <span class="status-text ${product.statusTextClass}">
                        ${product.status}
                    </span>
                    <div class="product-actions">
                        <span class="material-icons delete-icon" data-id="${product.id}">delete_outline</span>
                        <span class="material-icons edit-icon" data-id="${product.id}">edit</span>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    // Event Delegation: Handle both delete and edit clicks
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-icon')) {
            productToDeleteId = event.target.dataset.id;
            deleteModal.style.display = 'flex';
        } else if (event.target.classList.contains('edit-icon')) {
            const idToEdit = event.target.dataset.id;
            openEditModal(idToEdit);
        }
    });

    // Close the delete modal
    window.closeModal = function() {
        deleteModal.style.display = 'none';
        productToDeleteId = null;
    };

    // Handle delete confirmation
    confirmDeleteBtn.addEventListener('click', () => {
        if (productToDeleteId) {
            const index = products.findIndex(p => p.id === productToDeleteId);
            if (index !== -1) {
                products.splice(index, 1);
                renderProducts(products);
            }
        }
        closeModal();
    });

    // Function to open the edit modal and populate data
    function openEditModal(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            
            // Format the date to "YYYY-MM-DD" for the input field
            const date = new Date(product.date);
            const formattedDate = date.toISOString().slice(0, 10);
            document.getElementById('editProductDate').value = formattedDate;

            document.getElementById('editProductImage').value = product.image;
            editModal.style.display = 'flex';
        }
    }

    // Close the edit modal
    window.closeEditModal = function() {
        editModal.style.display = 'none';
        editForm.reset(); // Clear the form
    };

    // Handle form submission to save changes
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const idToUpdate = document.getElementById('editProductId').value;
        const index = products.findIndex(p => p.id === idToUpdate);
        
        if (index !== -1) {
            products[index].name = document.getElementById('editProductName').value;
            products[index].date = document.getElementById('editProductDate').value;
            products[index].image = document.getElementById('editProductImage').value;

            // TODO: Recalculate daysLeft and status based on the new date
            // This is a future enhancement you can add.

            renderProducts(products); // Update the list
            closeEditModal(); // Close the modal
        }
    });

    renderProducts(products);
});
document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.nav-bar');

    navBar.addEventListener('click', (event) => {
        const navItem = event.target.closest('.nav-item');

        if (navItem) {
            event.preventDefault();
            const itemId = navItem.id;

            switch (itemId) {
                case 'nav-products':
                    console.log('ไปที่หน้า Products');
                    window.location.href = 'products.html'; // หรือโค้ดสำหรับเปลี่ยนหน้าจอ
                    break;
                case 'nav-add':
                    console.log('ไปที่หน้า Add Product');
                    window.location.href = 'addproduct.html'; // หรือโค้ดสำหรับแสดงฟอร์ม
                    break;
                case 'nav-food':
                    console.log('ไปที่หน้า Food');
                    window.location.href = 'food.html'; // หรือโค้ดสำหรับแสดงหมวดหมู่ Food
                    break;
                default:
                    console.log('ไม่พบการกระทำ');
            }
        }
    });
});