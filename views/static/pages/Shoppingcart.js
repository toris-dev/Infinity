import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('장바구니 비었을때');
  }

  getCss() {
    return './static/css/shoppingcart.css';
  }

  getJs() {
    return './static/js/shoppingcart.js';
  }

  async getHtml() {
    // console.log(this.params); // params 불러오기 가능
    return `
    <div id="container">
            <div id="contents_main">
                <!--여기에 작성-->
                <div class="titleArea">
                    <h2><b>shopping cart</b></h2>
                </div>
                <div class="shoppingcart">
                    <img src="shoppingcart.png" alt="상품없음 사진">
                    <p>장바구니가 비어 있습니다</p>
                    <a href="#" class="all_product">전체상품주문</a>
                    <a href="#" class="select_product">선택상품주문</a>
                </div>
                <div class="product_all">  
                </div>
            </div>
        </div>
        `;
  }
}
