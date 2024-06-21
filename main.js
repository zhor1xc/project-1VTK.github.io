// Инициализация корзины из localStorage при загрузке страницы
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    closeDetails();
}

// Отображение товаров в корзине при загрузке страницы корзины (cart.html)
function displayCartItems() {
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

// Убирает одну единицу товара из корзины
function removeOneFromCart(title) {
    let itemIndex = cart.findIndex(item => item.title === title);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1); // Удаляем товар из корзины, если количество стало нулевым
        }
    }
    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems(); // После изменений в корзине обновляем отображение
}

function removeAllFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems(); // Обновляем отображение корзины
}

// Очищает корзину полностью
function clearCart() {
    cart = [];
    // Сохраняем пустую корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems(); // После очистки корзины обновляем отображение
}

// Переход к оформлению заказа
function proceedToCheckout() {
    // Clear the cart
    clearCart();

    // Display confirmation message
    let confirmation = confirm("Ваш заказ оформлен! Хотите вернуться на главную страницу?");
    
    if (confirmation) {
        window.location.href = "index.html"; // Перенаправляем на главную страницу
    }
}

// Инициализация при загрузке страницы
window.onload = function () {
    displayCartItems(); // Отображаем товары в корзине при загрузке страницы корзины
};

// Добавление обработчика для открытия корзины
document.getElementById('cart-link').addEventListener('click', function(e) {
    e.preventDefault();
    displayCartItems(); // Отображаем товары в корзине при открытии корзины
});
