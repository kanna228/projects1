document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.size-buttons').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.size-buttons').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if (window.location.href.includes('cart.html')) {
        loadCartItems();
    }
});

function addToCart() {
    const selectedSize = document.querySelector('.size-buttons.active')?.dataset.size;

    if (!selectedSize) {
        alert('Please select a size before adding to the cart.');
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
        name: 'Slim fit jeans',
        price: '49.99$',
        size: selectedSize
    };

    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    alert(`${selectedSize} size added to cart!`);
    location.reload();
}

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty</li>';
    } else {
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Size: ${item.size} - Price: ${item.price}`;
            cartList.appendChild(li);
        });
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCartItems();
}
