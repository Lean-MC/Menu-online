// Mostrar u ocultar items del menú
document.querySelectorAll('.category-btn').forEach(item => {
  item.addEventListener('click', event => {
    const items = event.target.nextElementSibling;
    items.style.display = items.style.display === 'block' ? 'none' : 'block';
  });
});

// Agregar plato al carro de compras
document.querySelectorAll('.add-btn').forEach(item => {
  item.addEventListener('click', event => {
    const itemName = event.target.parentNode.querySelector('.item-name').textContent.trim();
    const itemPrice = parseFloat(event.target.parentNode.querySelector('.item-price').textContent.replace('$', ''));
    const cartItems = document.querySelector('.cart-items');
    let cartItem = Array.from(cartItems.children).find(item => item.dataset.name === itemName);

    if (cartItem) {
      let countSpan = cartItem.querySelector('.count');
      countSpan.textContent = parseInt(countSpan.textContent) + 1;
    } else {
      cartItem = document.createElement('li');
      cartItem.dataset.name = itemName;
      cartItem.dataset.price = itemPrice;
      cartItem.innerHTML = `${itemName} <span class="count">
      1</span>  $${itemPrice.toFixed(2)}`;
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.textContent = '❌';
      cartItem.appendChild(removeBtn);
      cartItems.appendChild(cartItem);
    }
    
    updateTotalPrice();

    // Mostrar notificación
    const notification = document.getElementById('notification');
    notification.textContent = `${itemName} agregado al carro`;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 2000); // Ocultar la notificación después de 2 segundos
  });
});

// Mostrar carro de compras
document.getElementById('show-cart-btn').addEventListener('click', function() {
  document.getElementById('cart').style.display = 'block';
});

// Cerrar carro de compras
document.getElementById('close-cart-btn').addEventListener('click', function() {
  document.getElementById('cart').style.display = 'none';
});

// Eliminar plato del carro de compras
document.querySelector('.cart-items').addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-btn')) {
    const cartItem = event.target.parentNode;
    let countSpan = cartItem.querySelector('.count');
    if (parseInt(countSpan.textContent) > 1) {
      countSpan.textContent = parseInt(countSpan.textContent) - 1;
    } else {
      cartItem.remove();
    }
    updateTotalPrice();
  }
});



function updateTotalPrice() {
  const cartItems = document.querySelector('.cart-items');
  let totalPrice = 0;
  let totalItems = 0;
  cartItems.querySelectorAll('li').forEach(item => {
    const price = parseFloat(item.dataset.price); // Convertir el precio a un número decimal
    const count = parseInt(item.querySelector('.count').textContent);
    totalPrice += price * count;
    totalItems += count;
  });
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);
  document.getElementById('item-count').textContent = totalItems;
}
