import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('관리자페이지');
  }

  async getHtml() {
    return `
    
    <div class="flexbox-Container">

    <div class="product-item">
      <div class="product-Description">
        <div class="description-Image">
          <img src="상품1.png" alt="clothes-image" />
        </div>
        <div class="description-Content">
        <p class="des-Text">ID : Outer_47</p>
        <p class="des-Text">새학기 화이트 가디건</p>
        <p>Outer</p><br>
        <p class="des-Text">18,900원</p>
        </div>
        <form class="des-form">
          <!-- 클릭시 Product edit 라우팅 -->
          <input class="des-btn" type="button" value="···">
        </form>
      </div>
      <div>
        <p class="explain-item-main">상품설명</p>
        <p class="explain-item-sub">스타일리시하고 트렌디한 핏 연출.</p>
        <p class="explain-item-sub">대충 남친룩</p>
      </div>
      <div class="product-status">
        <a class="ps-text">주문건수</a><a>1269</a><br>
        <a class="ps-text2">재고량</a><a>1269</a>
      </div>
    </div>
</div>
</div>

    `;
  }
}
