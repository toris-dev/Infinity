import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Payment');
  }

  async getHtml() {
    return `
    <div class="titleArea">
        <h2>Order / Payment</h2>
    </div>
    <div>
        <div class="delivery-title">
            <h4 class="order__title">배송정보</h4>
        </div>
        <div>
            <ul class="order-list">
                <li class="order__item delivery__item__info">
                    <span class="order__item__label">배송지</span>
                    <div class="order__item__area">
                        <ul class="order__delivery__radio-wrap" id="quickDeliveryList">
                            <li>
                                <input type="radio" class="n-radio" id="delivery_choice_0" name="delivery_choice" value="" checked="">
                                <label for="delivery_choice_0">정영준님 배송지</label>
                            </li>
                            <li>
                                <input type="radio" class="n-radio" id="delivery_choice_1" name="delivery_choice" value="">
                                <label for="delivery_choice_1">정영준님 배송지</label>
                            </li>
                        </ul>
                        <button type="button" class="order__button">배송지 변경</button>
                    </div>
                </li>
                <li class="order__item delivery__item__info">
                    <span class="order__item__label">이름 / 연락처</span>
                    <div class="order__item__area">
                        <ul class="order__delivery__user">
                            <li id="delivery-name">정영준</li>
                            <li id="delivery-mobile">010-1234-1234</li>
                            <li id="delivery-phone">010-1234-1234</li>
                        </ul>
                    </div>
                </li>
                <li class="order__item delivery__item__info">
                    <span class="order__item__label">주소</span>
                    <div class="order__item__area" id="delivery-addr">(01234) 서울특별시 강남구 성수동 엘리스 1004호</div>
                </li> 
                <li class="order__item order__item--overflow delivery__item__info">
                    <span class="order__item__label">배송 요청사항</span>
                    <div class="order__item__area order__item__area--column">
                        <div class="order__select-wrap">
                            <select class="order__select" name="dlv_selectbox" id="dlv_selectbox" onchange="showEtc(this.value);">
                                                            <option value="" selected="selected">
                                    배송 시 요청사항을 선택해주세요
                                </option>
                                                            <option value="부재 시 경비실에 맡겨주세요">
                                    부재 시 경비실에 맡겨주세요
                                </option>
                                                            <option value="부재 시 택배함에 넣어주세요">
                                    부재 시 택배함에 넣어주세요
                                </option>
                                                            <option value="부재 시 집 앞에 놔주세요">
                                    부재 시 집 앞에 놔주세요
                                </option>
                                                            <option value="배송 전 연락 바랍니다">
                                    배송 전 연락 바랍니다
                                </option>
                                                            <option value="파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.">
                                    파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.
                                </option>
                                                            <option value="etc">
                                    직접 입력
                                </option>
                                                        </select>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="order__select__svg">
                                <path d="M3 6.60001L8.99965 12.6L15 6.60001" stroke="black"></path>
                            </svg>
                        </div>
                        <textarea class="order__textarea" name="etc_textarea" id="etc_textarea" style="display:none" maxlength="50" onkeyup="return textarea_maxlength(this)" placeholder="최대 50자까지 입력 가능합니다."></textarea>
                    </div>
                </li>
            </ul>
            <div class="order_product_info">
                <h3 class="order__title">상품 정보</h3>
                <!--cart products-->
                <table class="table_basic order_cart_table">
                    <colgroup>
                        <col>
                        <col width="50px">
                        <col width="80px">
                        <col width="70px" class="charge ">
                        <col width="100px" class="charge ">
                        <col width="100px" class="charge ">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">상품 정보</th>
                            <th scope="col">수량</th>
                            <th scope="col">상품 할인</th>
                            <th scope="col">배송 그룹</th>
                            <th scope="col">배송비</th>
                            <th scope="col">주문금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="td_product">
                                <div class="connect_img">
                                    <a href="#" target="_blank">
                                        <img src="/static/images/product.png" alt="셔츠">
                                    </a>
                                </div>
                                <div class="article_info connect_info">
                                    <div class="box_product">
                                        <strong>
                                            <span style="color:#09f;"></span>
                                            <span style="color:#f00;"></span>
                                            [자체 제작]
                                        </strong><br/>
                                        <span class="list_info">
                                            <a href="#" target="_blank">인피니티 플렌티 스웻 팬츠</a>
                                        </span>
                                    </div>
                                    <div class="order_option_box"><p></p></div>
                                </div>
                            </td>
                            <td><strong>1 개</strong></td>
                            <td>- 55,500 원</td>
                            <td rowspan="1">그룹1</td>
                            <td rowspan="1">
                                <span class="box_normal-dlv-amt">무료</span>
                            </td>
                            <td class="price">
                                <del class="box_origin_price">92,500 원</del>
                                <strong>37,000 원</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="cell_order_form">
                    <div>
                        <ul class="list_section_type">
                            <li>· 구매 가능 수량이 1개로 제한된 상품은 주문 취소 시, 24시간 내 가상계좌 재주문이 불가합니다.</li>
                            <li>· 인피니티 스토어는 기본적으로 대한민국 내 제주도 및 도서 산간 지역 제외 <span>전 지역, 전 상품 무료배송</span>입니다.</li>
                            <li>· 해외 배송 상품이나 일부 업체의 경우, 교환/환불 시 반송료가 다를 수 있으며 상품 페이지에 별도 표기되어 있습니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="section_payment">
                <h3 class="order__title">결제 정보</h3>
                <ul class="list_payment_order">
                    <li class="cell_discount_tit new-payment-area">결제 수단</li>
                    <li class="cell_discount_detail new-payment-area">
                        <ul class="payment-choice">
                            <li>
                                <input type="radio" class="n-radio" id="payment_btn1" name="payment_choice" value="">
                                <label for="payment_btn1">일반결제</label>
                            </li>																	
                        </ul>
                    </li>
                </ul>
                <ul class="list_payment_order">
                    <li class="cell_discount_tit new-payment-area">결제 안내</li>
                    <li class="cell_discount_detail new-payment-area">
                        <a class="card-payment">카드</a>
                    </li>
                </ul>
            </div>

            <div class="section-final">
                <h3 class="order__title">최종 결제금액</h3>
                <div class="final-payment">
                    <ul class="product">
                        <li>
                            <div>
                                <p>주문금액</p>
                                <div class="sub">
                                    <p>상품금액</p>
                                    <p>배송비</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>42,300원</p>
                                <div class="add-all">
                                    <p>42,300원</p>
                                    <p>무료</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <ul class="list">
                            <li>총 결제금액</li>
                            <li class="last-amount"><b>42,300원</b></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="center-content">
                <a>결제하기</a>
            </div>
        </div>
    </div>
    `;
  }
}
