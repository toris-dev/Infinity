import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Product');
  }

  getCss() {
    return './static/css/product.css';
  }

  getJs() {
    return './static/js/product.js';
  }

  async getHtml() {
    return `
    <div class="detail-product">
        <div class="leftside-area">
            <div class="swiper mySwiper2 detail1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                    <img src="/static/images/testimage.jpeg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="/static/images/testimage.jpeg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="/static/images/testimage2.jpeg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="/static/images/testimage2.jpeg" />
                    </div>
                </div>
                </div>
                <div thumbsSlider="" class="swiper mySwiper detail2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                    <img src="/static/images/testimage.jpeg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="/static/images/testimage.jpeg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="/static/images/testimage2.jpeg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="/static/images/testimage2.jpeg" />
                    </div>
                </div>
            </div>
        </div>
        <div class="rightside-area">
            <div class="title-product">
                <h4><b>[자체 제작] 인피니티 에센셜 스웻 팬츠</b></h4>
            </div>
            <div class="detail-txt">
                <ul>
                    <li>
                        <div>
                            <p>Price</p>
                            <span>₩36,000</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Comment</p>
                            <span>
                                <i>only infinity</i>
                                <br/>
                                두 가지 기장감으로 출시<br/>
                                딥하게 잡힌 원 핀턱 디테일<br/>
                                데일리한 6가지 컬러 구성<br/>
                                체형에 큰 구애 없이 편하게 착용 가능<br/>
                                여러번의 핏 수정을 통한 최적의 일자 와이드핏
                                <br/><br/>
                                <i>
                                    오직 infinity에서만 만나보실 수 있습니다.<br/>
                                    출시 기념 무료배송 이벤트 진행합니다.♡
                                </i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>6color</p>
                            <span>gray / deep green / cocoa / black / white / indi pink</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>fabric</p>
                            <span>cotton 100</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>size (cm)</p>
                            <span>
                                롱 기장 : 허리 밴딩34 / 밑위33 / 허벅지36 / 밑단26 / <i class="total-length">총길이106</i><br/>
                                기본 기장 : 허리 밴딩34 / 밑위33 / 허벅지36 / 밑단26 / <i class="total-length">총길이98</i> 
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="special-selection">
                <div>
                    <p>color</p>
                    <div class="select">
                        <select id="clothColor">
                            <option selected>color</option>
                            <option value="그레이">그레이</option>
                            <option value="딥그린">딥그린</option>
                            <option value="코코아">코코아</option>
                            <option value="블랙">블랙</option>
                            <option value="화이트">화이트</option>
                            <option value="인디핑크">인디핑크</option>
                        </select>
                    </div>
                </div>
                <div>
                    <p>size</p>
                    <div class="select">
                        <select id="clothSize">
                            <option selected>size</option>
                            <option value="롱기장">롱기장</option>
                            <option value"기본기장">기본기장</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="result">
                <ul id="cart-items">
                    <li>
                        <div>
                            <p class="titleName"></p>
                            <span class="colorSize"></span>
                        </div>
                    </li>
                    <li>
                        <div class="result-wrap">
                            <p class="quantity">1</p><a id="increase">+</a><a id="decrease">-</a>
                        </div>
                    </li>
                    <li>
                        <div class="result-number"></div>
                    </li>
                    <li>
                        <div>
                            <a class="delete-item">X</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="total-amount">
                <ul>
                    <li>
                        <div>
                            <p><b>Total</b>(Qty) : <b id="total-price">0</b> (<span id="quantity2">0</span>개)</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <a class="get-product-btn">Buy Now</a>
                            <a class="add-product-btn">Add to Cart</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="img-section">
        <div>
            <img src="/static/images/포스터.png">
            <img src="/static/images/test2.png">
        </div>
    </div>

    <div class="comment-box">
        <ul>
            <li>
                <div>
                    <p>payment Info</p>
                    <div>
                        <p>
                            - 결제 가능 수단 -
                            <br/><br/>
                            무통장입금<br/>
                            실시간계좌이체<br/>
                            신용카드<br/>
                            휴대폰결제<br/>
                            네이버페이<br/>
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <p>Delivery Info</p>
                    <div>
                        <p>
                            밤 9시 이전 주문건들에 한하여 그 다음날 배송이 출고됩니다. (주말, 공휴일 제외)<br/>
                            주문량이 많거나 리오더 중인 제품은 배송 출고까지 기간이 조금 더 걸릴 수 있습니다.<br/>
                            배송 지연이 길어질 경우 따로 안내해 드립니다.^^
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <p>Return & Exchange Info</p>
                    <div>
                        <p>
                            교환 및 반품안내는 Notice 게시판을 참고해주세요 :&#41;
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    `;
  }
}
