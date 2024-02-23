export const infinityScroll = () => {
  const productsContainer = document.querySelector('.products');
  let lastContainer = document.querySelector('.products:last-child');
  const getProduct = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 데이터 로드 함수 호출
        io.unobserve(lastContainer);
        loadProducts();
        io.observe(lastContainer);
      }
    });
  };
  const io = new IntersectionObserver(getProduct, { threshold: 0 });

  // 초기 페이지 로드 시 데이터 로드
  loadProducts();

  // 데이터 로드 함수
  function loadProducts() {
    const createCount = 12;
    for (let index = 0; index < createCount; index++) {
      const product = {
        src: '/static/images/test1.webp',
        prodName: '스카이 퍼 더블니 데님',
        prodCost: '59,000'
      };
      if (index === 11) {
        lastContainer = createProduct(product);
      }
    }
  }

  // 상품 요소 생성 함수
  function createProduct(product) {
    const prodElement = document.createElement('li');
    prodElement.innerHTML = `
      <a>
        <img src="${product.src}" alt="${product.prodName}">
        <div>
          <p>${product.prodName}</p>
          <span class="sale-before">₩${product.prodCost}</span><br/>
          <span>${product.prodCost} (7%)</span>
        </div>
      </a>`;
    return productsContainer.appendChild(prodElement); // 상품 요소를 추가합니다.
  }

  // Intersection Observer를 상품 요소에 연결
  io.observe(productsContainer.lastElementChild);
};
