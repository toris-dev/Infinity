import AbstractView from './AbstractView.js';

// 무한스크롤 구현
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('categoryProducts');
    // data fetching 후 변경 예정
    this.catetory = [
      'new',
      'Best',
      '1+1',
      'All',
      'Outer',
      'Top',
      'Bottom',
      'Shoes',
      'Acc'
    ];

    this.title2 = 'All'; // Category 선택에 따른 string
    this.count = 12; // 검색 결과에 따른 count
  }

  getCss() {
    return '/static/css/category.css';
  }

  async getHtml() {
    if (!this.catetory.includes(this.params.categoryProducts)) {
      window.history.pushState(null, '', '/product/error');
      return '';
    }
    return `
    <div class="titleContainer">
        <strong class="categoryTitle">${this.title2}</strong>
    </div>
    <div class="New-arrival">
    <p class="searchCount">검색 결과 ${this.count}개 검색.</p>
      <ul class="products">
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
          <li>
              <a><img src="/static/images/test1.webp">
              <div>
                  <p>스카이 퍼 더블니 데님</p>
                  <span class="sale-before">₩59,000</span><br/>
                  <span>54,900 (7%)</span>
              </div>
              </a>
          </li>
      </ul>
    </div>
    `;
  }
}
