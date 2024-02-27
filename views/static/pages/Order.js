import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Order');
  }

  async getHtml() {
    return `
    <div class="titleArea">
        <h2>주문내역</h2>
    </div>
    <div class="order-content">
        <ul>
            <li><a class="year">최근 1년</a></li>
        </ul>
        <div class="order-table">
          <table>
            <colgroup>
              <col>
              <col width="100px">
              <col width="300px">
              <col width="100px">
              <col width="100px">
            </colgroup>
            <thead>
              <tr>
                <th>상품정보</th>
                <th>주문일자</th>
                <th>배송지주소</th>
                <th>주문금(수량)</th>
                <th>주문상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="product-info">
                    <div class="img-box">
                      <img src="/static/images/상품이미지2.png" alt="상품"/>
                    </div>
                    <div class="product-txt">
                      <p>울 라이크 브이넥 니트</p>
                      <p>color: 오트밀</p>
                      <p>옵션 : XL</p>
                    </div>
                  </div>
                </td>
                <td>2023.02.11</td>
                <td>부산광역시 부산진구 서전로10번길 61 106호</td>
                <td>39,000원(1개)</td>
                <td>
                  <div>
                    <a class="delivery-btn delivery-reject">환불완료</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="product-info">
                    <div class="img-box">
                      <img src="/static/images/상품이미지1.png" alt="상품"/>
                    </div>
                    <div class="product-txt">
                      <p>울 라이크 브이넥 니트</p>
                      <p>color: 오트밀</p>
                      <p>옵션 : XL</p>
                    </div>
                  </div>
                </td>
                <td>2023.02.11</td>
                <td>부산광역시 부산진구 서전로10번길 61 106호</td>
                <td>39,000원(1개)</td>
                <td>
                  <div>
                    <a class="delivery-btn delivery-success">배송완료</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="product-info">
                    <div class="img-box">
                      <img src="/static/images/상품이미지2.png" alt="상품"/>
                    </div>
                    <div class="product-txt">
                      <p>울 라이크 브이넥 니트</p>
                      <p>color: 오트밀</p>
                      <p>옵션 : XL</p>
                    </div>
                  </div>
                </td>
                <td>2023.02.11</td>
                <td>부산광역시 부산진구 서전로10번길 61 106호</td>
                <td>39,000원(1개)</td>
                <td>
                  <div>
                    <a class="delivery-btn delivery-reject">환불완료</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="product-info">
                    <div class="img-box">
                      <img src="/static/images/상품이미지1.png" alt="상품"/>
                    </div>
                    <div class="product-txt">
                      <p>울 라이크 브이넥 니트</p>
                      <p>color: 오트밀</p>
                      <p>옵션 : XL</p>
                    </div>
                  </div>
                </td>
                <td>2023.02.11</td>
                <td>부산광역시 부산진구 서전로10번길 61 106호</td>
                <td>39,000원(1개)</td>
                <td>
                  <div>
                    <a class="delivery-btn delivery-success">배송완료</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="product-info">
                    <div class="img-box">
                      <img src="/static/images/상품이미지2.png" alt="상품"/>
                    </div>
                    <div class="product-txt">
                      <p>울 라이크 브이넥 니트</p>
                      <p>color: 오트밀</p>
                      <p>옵션 : XL</p>
                    </div>
                  </div>
                </td>
                <td>2023.02.11</td>
                <td>부산광역시 부산진구 서전로10번길 61 106호</td>
                <td>39,000원(1개)</td>
                <td>
                  <div>
                    <a class="delivery-btn delivery-reject">환불완료</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="product-info">
                    <div class="img-box">
                      <img src="/static/images/상품이미지1.png" alt="상품"/>
                    </div>
                    <div class="product-txt">
                      <p>울 라이크 브이넥 니트</p>
                      <p>color: 오트밀</p>
                      <p>옵션 : XL</p>
                    </div>
                  </div>
                </td>
                <td>2023.02.11</td>
                <td>부산광역시 부산진구 서전로10번길 61 106호</td>
                <td>39,000원(1개)</td>
                <td>
                  <div>
                    <a class="delivery-btn delivery-success">배송완료</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    `;
  }
}
