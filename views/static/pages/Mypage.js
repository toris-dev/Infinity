import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('마이페이지');
  }

  getCss() {
    return '/static/css/mypage.css';
  }

  async getHtml() {
    return `
    <div class="mypage-title">
      <h1>마이페이지</h1>
    </div>
    
    <div class="myInfo">
      <p>내 정보</p>
    </div>
    <div class="infoBox">
    <img src="/static/images/product.png" alt="프로필 사진">
        <div class="infoBox_script">
          <span class="name">김인피 님</span><br>
          <span class="email">qwer1234@naver.com</span><br>
          <a href="#" class="info_edit">정보수정</a>
        </div>
    </div>

    <div class="spantext">
    <span class="order_text">주문·배송</span>
    </div>
      <div class="order_delivery_box">
        <ul class="order_delivery_list">
            <li><button class="icon-button deposit-btn"></button>입금/결제</li>
            <li><button class="icon-button preparing-btn"></button>배송 준비 중</li>
            <li><button class="icon-button delivery-btn"></button>배송 중</li>
            <li>
              <button class="icon-button complete-btn"><div class="fixpng"></div></button>배송 완료
            </li>
            <li>
              <button class="icon-button refund-btn"><div class="fixpng"></div></button>취소/교환/환불
          </li>
      </ul>
    </div>
  </div>

  <div class="order_list">
    <ul class="order_list_con">
      <li><div class="ol_list"><img src="/static/images/icon-cancel.png"></div>주문 내역이 없습니다.</li>
    </ul>
  </div>
        `;
  }
}
