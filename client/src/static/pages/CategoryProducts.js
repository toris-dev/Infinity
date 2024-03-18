import AbstractView from './AbstractView.js';

// 무한스크롤 구현
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('categoryProducts');
    // data fetching 후 변경 예정
    this.count = 12;
  }

  async getHtml() {
    // 카테고리별 상품 나열
    // /categories/prodSubCategory/Bottoms
    const query = new URLSearchParams(window.location.search);
    const prodSubCategory = query.get('prodCategory');

    return `
    <div class="titleContainer">
        <strong class="categoryTitle">${prodSubCategory}</strong>
    </div>
    <div class="New-arrival">
      <ul class="products">

      </ul>
    </div>
    `;
  }
}
