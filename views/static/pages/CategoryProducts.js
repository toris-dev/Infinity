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

    this.title2 = this.extractCategoryFromURL(); // URL에서 카테고리 추출 // Category 선택에 따른 string
    this.count = 12; // 검색 결과에 따른 count
  }

  // URL에서 카테고리 추출하는 함수
  extractCategoryFromURL() {
    const categoryKeywords = [
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
    const pathName = window.location.pathname;
    const matchedCategory = categoryKeywords.find((keyword) =>
      pathName.includes(`/categorys/${keyword}`)
    );
    return matchedCategory ? matchedCategory : 'All';
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
      </ul>
    </div>
    `;
  }
}
