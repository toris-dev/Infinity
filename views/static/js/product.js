export const product = () => {
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper.detail2', {
    spaceBetween: 5,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true
  });
  // eslint-disable-next-line no-undef, no-unused-vars
  const swiper2 = new Swiper('.mySwiper2.detail1', {
    spaceBetween: 10,
    thumbs: {
      swiper
    }
  });

  // 요소
  const colorSelect = document.getElementById('clothColor');
  const sizeSelect = document.getElementById('clothSize');
  const costItem = document.querySelector('.result-number');
  const titleItem = document.querySelector('.titleName');
  const optionItem = document.querySelector('.colorSize');
  const totalPrice2 = document.querySelector('#total-price');
  const countItem = document.getElementById('quantity2');
  var countNum = document.querySelector('.quantity').textContent;
  const itemPrice2 = parseInt(
    document
      .querySelector('.detail-txt ul li:first-child span')
      .textContent.replace('₩', '')
      .replace(',', '')
  );
  const cartItemListElement = document.querySelector('.result');

  // IndexDB 생성
  let db;
  const request = window.indexedDB.open('cartDB', 1);

  request.onerror = function (event) {
    console.log('Database error: ' + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    console.log('Database opened successfully');
    db = event.target.result;
    // 페이지가 로드될 때 기존 장바구니 데이터를 불러옵니다.
    loadCartItems();
  };

  request.onupgradeneeded = function (event) {
    console.log('Database upgrade needed');
    db = event.target.result;
    const objectStore = db.createObjectStore('cart', {
      keyPath: 'id',
      autoIncrement: true
    });
  };

  function loadCartItems() {
    const transaction = db.transaction(['cart'], 'readonly');
    const objectStore = transaction.objectStore('cart');

    const request = objectStore.getAll();
    request.onsuccess = function (event) {
      cartItems = event.target.result || [];
      updateCartItemList();
      updateTotal();
    };
  }

  let cartItems = [];
  // 장바구니에 사용될 아이템 ID 카운터
  let cartItemIdCounter = 1;

  function addToCart(itemName, itemPrice, color, size) {
    const transaction = db.transaction(['cart'], 'readwrite');
    const objectStore = transaction.objectStore('cart');
    // 아이템 ID 할당 후 증가
    const newItem = {
      id: cartItemIdCounter++,
      name: itemName,
      price: itemPrice,
      color: color,
      size: size
    };

    const request = objectStore.add(newItem);

    request.onsuccess = function () {
      console.log('Item added to the cart');
    };

    request.onerror = function () {
      console.log('Error adding item to the cart');
    };

    // 장바구니 아이템 배열에 추가
    cartItems.push(newItem);

    // 장바구니에 추가한 아이템 목록 업데이트
    updateCartItemList();
  }

  function updateCartItemList() {
    cartItemListElement.innerHTML = ''; // 이전 목록 제거
    console.log(cartItems);
    cartItems.forEach((item) => {
      const ul = document.createElement('ul');
      ul.dataset.id = item.id; // data-id 속성 추가
      ul.innerHTML = `
        <li>
            <div>
                <p class="titleName">${item.name}</p>
                <span class="colorSize">- ${item.color} / ${item.size}</span>
            </div>
        </li>
        <li>
            <div class="result-wrap">
                <p class="quantity">1</p><a class="increase">+</a><a class="decrease">-</a>
            </div>
        </li>
        <li>
            <div class="result-number">36,000</div>
        </li>
        <li>
            <div>
                <a class="delete-item" data-id="${item.id}">X</a>
            </div>
        </li>
      `;
      cartItemListElement.appendChild(ul);
    });
  }

  function removeFromCart(itemId) {
    // 배열에서 해당 ID를 가진 아이템 제거
    cartItems = cartItems.filter((item) => item.id !== itemId);
    const transaction = db.transaction(['cart'], 'readwrite');
    const objectStore = transaction.objectStore('cart');

    const deleteRequest = objectStore.delete(itemId);

    deleteRequest.onsuccess = function () {
      console.log('Item deleted from the cart');
    };

    deleteRequest.onerror = function () {
      console.log('Error deleting item from the cart');
    };

    // 장바구니 아이템 목록 업데이트
    updateCartItemList();
  }

  function updateTotal() {
    let totalQuantity = 0; // 총 수량 계산을 위한 변수
    let totalPrice = 0; // 총 가격 계산을 위한 변수

    // 각 아이템의 수량과 가격을 반복하여 총 수량과 총 가격을 계산
    cartItems.forEach((item) => {
      const quantityElement = document.querySelector(
        `.result [data-id="${item.id}"] .quantity`
      );
      const quantity = parseInt(quantityElement.textContent);
      if (!isNaN(quantity)) {
        totalQuantity += quantity;
        totalPrice += item.price * quantity;
      }
    });

    // 총 수량과 총 가격을 화면에 업데이트
    document.getElementById('quantity2').textContent = totalQuantity;

    // 총 가격이 NaN이 아니면 그대로 업데이트, NaN이면 0으로 처리
    if (isFinite(totalPrice)) {
      // 수정된 부분
      document.getElementById('total-price').textContent = totalPrice;
    } else {
      document.getElementById('total-price').textContent = '0';
    }
  }

  sizeSelect.addEventListener('change', function () {
    checkAndDisplay();
    updateTotal(); // 사이즈 변경 시 총 가격 업데이트
  });

  const addToCartBtn = document.querySelector('.add-product-btn');

  addToCartBtn.addEventListener('click', function () {
    const itemName = document.querySelector('.title-product b').textContent;
    const itemPriceElement = document.querySelector(
      '.detail-txt ul li:first-child span'
    );
    const itemPrice = parseInt(
      itemPriceElement.textContent.replace('₩', '').replace(',', '')
    );
    const color = colorSelect.value;
    const size = sizeSelect.value;
    addToCart(itemName, itemPrice, color, size);
    updateTotal(); // 장바구니에 아이템을 추가한 후 총 가격 업데이트
  });

  // 각 아이템에 대한 이벤트 리스너 추가
  document.querySelectorAll('.result').forEach((item) => {
    item.addEventListener('click', function (event) {
      const target = event.target;
      const listItem = target.closest('ul');
      const itemId = parseInt(listItem.dataset.id);

      if (target.classList.contains('increase')) {
        // + 버튼 클릭 시
        const quantityElement = listItem.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        const newQuantity = currentQuantity + 1;
        quantityElement.textContent = newQuantity;

        // 해당 아이템의 가격 업데이트
        const itemPriceElement = listItem.querySelector('.result-number');
        const itemIndex = cartItems.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          const item = cartItems[itemIndex];
          itemPriceElement.textContent = (
            item.price * newQuantity
          ).toLocaleString();
        }

        // 총 가격 업데이트
        updateTotal();
      } else if (target.classList.contains('decrease')) {
        // - 버튼 클릭 시
        const quantityElement = listItem.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
          const newQuantity = currentQuantity - 1;
          quantityElement.textContent = newQuantity;

          // 해당 아이템의 가격 업데이트
          const itemPriceElement = listItem.querySelector('.result-number');
          const itemIndex = cartItems.findIndex((item) => item.id === itemId);
          if (itemIndex !== -1) {
            const item = cartItems[itemIndex];
            itemPriceElement.textContent = (
              item.price * newQuantity
            ).toLocaleString();
          }

          // 총 가격 업데이트
          updateTotal();
        }
      } else if (target.classList.contains('delete-item')) {
        // X 버튼 클릭 시
        listItem.remove();
        removeFromCart(itemId);

        // 장바구니가 비었을 때의 처리
        if (cartItems.length === 0) {
          cartItemListElement.innerHTML =
            '<p class="no-cart">장바구니가 비었습니다</p>';
        }

        // 장바구니 아이템을 제거한 후 총 가격 업데이트
        updateTotal();
      }
    });
  });

  function checkAndDisplay() {
    const colorValue = colorSelect.value;
    const sizeValue = sizeSelect.value;

    if (colorValue !== '' && sizeValue !== '') {
      alert('값을 선택했네요');
    } else {
      alert('값을 선택안했네요');
    }
  }
};
