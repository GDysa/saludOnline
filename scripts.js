
document.addEventListener('click', function(event) {
    const menuCheckbox = document.getElementById('btn-menu');
    const menuContainer = document.querySelector('.container-menu');
    const menuLabel = document.querySelector('.btn-menu label');

    // Si el checkbox está marcado (menú abierto) y el clic está fuera del menú y del botón de apertura:
    if (menuCheckbox.checked && !menuContainer.contains(event.target) && !menuLabel.contains(event.target)) {
        menuCheckbox.checked = false; // Cerrar el menú
    }
});


function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito!');
    updateCartTotal();
}

function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log("Total acumulado en el carrito: $" + total);
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('lista-carrito');
    let totalElement = document.getElementById('total-carrito');
    let payButton = document.getElementById('btn-pagar');
    let payMessage = payButton.nextElementSibling; // Selecciona el mensaje que está justo debajo del botón

    cartList.innerHTML = ''; // Limpiar la lista antes de mostrar
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<p>El carrito está vacío.</p>';
        totalElement.innerHTML = ''; // Limpiar el total si el carrito está vacío
        payButton.style.display = 'none'; // Ocultar el botón de pagar
        payMessage.style.display = 'none'; // Ocultar el mensaje de pagar
        return;
    }

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartList.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}
            </div>
        `;
    });

    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    payButton.style.display = 'block'; // Mostrar el botón de pagar
    payMessage.style.display = 'block'; // Mostrar el mensaje de pagar
}


function completePurchase() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito

    if (cart.length === 0) {
        alert('Carrito vacío'); // Mostrar alerta si el carrito está vacío
    } else {
        localStorage.removeItem('cart'); // Limpiar el carrito
        displayCart(); // Actualizar la visualización del carrito
        alert('¡Compra realizada con éxito!'); // Mostrar alerta de compra realizada
    }
}

