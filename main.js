let cart = [];

function setupEventListeners() {
    document.querySelector('#details-modal .close').addEventListener('click', closeDetails);
    document.querySelector('#cart-modal .close').addEventListener('click', closeCart);
}

function showDetails(title, description, price, imageUrl) {
    // Сначала устанавливаем данные в модальное окно
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-image').src = imageUrl;

    // Потом вызываем addToCart()
    addToCart();
    document.getElementById('details-modal').style.display = 'block';
}

function closeDetails() {
    document.getElementById('details-modal').style.display = 'none';
    document.getElementById('quantity').value = 1; // Reset the quantity to 1
}

function addToCart() {
    let quantity = document.getElementById('quantity').value;
    let title = document.getElementById('modal-title').innerText;
    let price = document.getElementById('modal-price').innerText;
    let imageUrl = document.getElementById('modal-image').src;

    let existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({
            title: title,
            quantity: parseInt(quantity),
            price: parseInt(price),
            imageUrl: imageUrl
        });
    }

    closeDetails();
}

// Открывает корзину и отображает товары в ней
function openCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Очищаем контейнер

    let totalPrice = 0;
    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        let itemImage = document.createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.title;
        itemImage.style.maxWidth = '50px'; // Пример стилей для изображения

        let itemInfo = document.createElement('div');
        itemInfo.classList.add('cart-item-info');

        let itemTitle = document.createElement('h4');
        itemTitle.innerText = item.title;

        let itemQuantity = document.createElement('span');
        itemQuantity.innerText = ` x ${item.quantity}`;

        let removeOneButton = document.createElement('button');
        removeOneButton.innerText = 'Убрать 1';
        removeOneButton.addEventListener('click', function() {
            removeOneFromCart(item.title);
        });
        removeOneButton.classList.add('cart-button');

        let removeAllButton = document.createElement('button');
        removeAllButton.innerText = 'Убрать все';
        removeAllButton.addEventListener('click', function() {
            removeAllFromCart(item.title);
        });
        removeAllButton.classList.add('cart-button');

        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemQuantity);
        itemInfo.appendChild(removeOneButton);
        itemInfo.appendChild(removeAllButton);

        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemInfo);

        cartItemsContainer.appendChild(cartItem);

        // Подсчитываем общую стоимость
        totalPrice += item.price * item.quantity;
    });

    // Обновляем общую стоимость
    document.getElementById('total-price').innerText = totalPrice;
}

function closeCart() {
    document.getElementById('cart-modal').style.display = "none";
}

function decreaseQuantity() {
    let quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function increaseQuantity() {
    let quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').innerText;
        const description = this.querySelector('p').innerText;
        const price = this.querySelector('.price').innerText.replace('р', '').trim();
        const imageUrl = this.querySelector('img').src;
        showDetails(title, description, price, imageUrl);
    });
});

document.querySelectorAll('.main-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Добавление обработчика для открытия корзины
document.getElementById('cart-link').addEventListener('click', function(e) {
    e.preventDefault();
    openCart();
});

// Убирает одну единицу товара из корзины
function removeOneFromCart(title) {
    let itemIndex = cart.findIndex(item => item.title === title);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1); // Удаляем товар из корзины, если количество стало нулевым
        }
    }
    openCart(); // После изменений в корзине обновляем отображение
}

function removeAllFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    openCart(); // Обновляем отображение корзины
}

// Очищает корзину полностью
function clearCart() {
    cart = [];
    openCart(); // После очистки корзины обновляем отображение
}

// Переход к оформлению заказа
function proceedToCheckout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

setupEventListeners();

// Пример добавления обработчика для открытия корзины
document.getElementById('cart-link').addEventListener('click', function(e) {
    e.preventDefault();
    openCart();
});
