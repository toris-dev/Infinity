import { BASE_URI } from '../js/constant/url.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('관리자페이지');
  }

  async getHtml() {
    const res = await fetch(`${BASE_URI}/api/category`, {
      method: 'GET'
    });
    const categoriesData = await res.json();
    let categories = ``;
    //대분류 생성
    for (let majorCategory of categoriesData) {
      categories += `<form action="" class="form-box">
      <div class="ct-box" id="ct-${majorCategory.prodMajorCategory}">
        <span class="ct-product">${majorCategory.prodMajorCategory}</span>
        <div class="ct-button-box">
          <button class="button is-link edit-product">추가</button>
          <button class="button is-success edit-product">수정</button>
          <button class="button is-black edit-product">삭제</button>
        </div>
      </div>
    </form>

      `;

      for (let subCategory of majorCategory.prodSubCategories) {
        categories += `
       <form action="" class="acform-box">
      <div class="ac-box" id="ad-${subCategory.prodSubCategory}">
        <span class="ac-product">${subCategory.prodSubCategory}</span>
        <div class="ac-button-box">
          <button class="button is-link edit-product">추가</button>
          <button class="button is-success edit-product">수정</button>
          <button class="button is-black edit-product">삭제</button>
        </div>
      </div>
    </form>`;
      }
    }

    return `
    <div class="columns">
    <aside class="column is-2 aside hero is-fullheight">
    <div>
    <div class="compose has-text-centered">
    <a class="button is-danger is-block is-bold">
    <span class="compose">Infinity</span>
    </a>
    </div>
    <div class="main">
    <a href="#" class="item active">
    <span class="icon">
    <i class="fa fa-home fa-fw"></i>
    </span>
    <span class="name">General</span>
    </a>
    <a href="#" class="item">
    <span class="icon">
    <i class="fa fa-star"></i>
    </span>
    <span class="name">Sales History</span>
    </a>
    <a href="#" class="item">
    <span class="icon">
    <i class="fa fa-envelope-o"></i>
    </span>
    <span class="name">Category</span>
    </a>
    <a href="#" class="item">
    <span class="icon">
    <i class="fa fa-folder-o"></i>
    </span>
    <span class="name">Product</span>
    </a>
    <a href="#" class="item">
    <span class="icon">
    <i class="fa fa-inbox"></i>
    </span>
    <span class="name">Order</span>
    </a>
    </div>
    </div>
    </aside>
    <div class="column messages hero is-fullheight">
    <div class="admin-ct-title">
    <h2>카테고리</h2>
  </div>
  <div class="admin-ct-all">
    <div class="admin-ct-control-btn">
      <button class="button is-link con-add">추가</button>
    </div>
    ${categories}
   </div>
    
    <div class="admin-ct-applybtn">
      <button class="button is-link edit-apply">변경 사항 적용</button>
      <button class="button is-black cancle-apply">취소</button>
    </div>
  </div>
</div>
</div>
    
    </div>
    </div>
    `;
  }
}
