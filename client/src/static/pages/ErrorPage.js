import AbstractView from './AbstractView';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('404');
  }

  async getHtml() {
    return `
      <div class="errorContainer">
        <img src="/imagesErrorImage.png" class="errorImg">
        <a href="/" data-link>홈페이지로 이동하기  <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
  }
}
