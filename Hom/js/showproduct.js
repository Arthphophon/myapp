document.addEventListener('DOMContentLoaded', () => {
   const products = [
       {
           name: 'หมู',
           image: 'https://www.pitchameat.com/wp-content/uploads/2023/03/Mainsite-4.webp',
           daysLeft: 0,
           date: '31 Jul 2025',
           id: '332798147',
           status: 'Expired',
           statusClass: 'status-expired',
           statusTextClass: 'status-expired-text'
       },
       {
           name: 'ไข่ไก่',
           image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkGNK7Xgpp0_Kk9v1SHlCFxEO4Jl6crqCwg&s',
           daysLeft: 1,
           date: '2 Aug 2025',
           id: '887902578',
           status: 'Expiring Soon',
           statusClass: 'status-soon',
           statusTextClass: 'status-soon-text'
       },
       {
           name: 'ไก่',
           image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsWuJj0RLHOmGR5hlgq9Ij3pV0XjRfQ84CjyXPcnW7gxw7DXV0tM8mSKQxF61NpNYXXto&usqp=CAU',
           daysLeft: 9,
           date: '10 Aug 2025',
           id: '241812347',
           status: 'Fresh',
           statusClass: 'status-fresh',
           statusTextClass: 'status-fresh-text'
       }
   ];

   const productList = document.getElementById('productList');

   products.forEach(product => {
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
                   <span class="material-icons">delete_outline</span>
                   <span class="material-icons">edit</span>
               </div>
           </div>
       `;

       productList.appendChild(productCard);
   });
});
