import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('관리자페이지');
  }

  async getHtml() {
    return `
        <div class="admin-ct-title">
          <h2>카테고리</h2>
        </div>
        <div class="admin-ct-all">
            <div class="admin-ct-control-btn">
          <button class="button is-black con-del">선택 삭제</button>
          <button class="button is-link con-add">추가</button>
          </div>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-best">
              <span class="ct-product">Best</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-All">
              <span class="ct-product">All</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-Outer">
              <span class="ct-product">Outer</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-Bottoms">
              <span class="ct-product">Bottoms</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-Skirt">
              <span class="ct-product">Skirt</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-Bag">
              <span class="ct-product">Bag</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-Shoes">
              <span class="ct-product">Shoes</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>
          <form action="" class="form-box">
            <input type="checkbox" id="ct-checkbox" checked />
            <div class="ct-box" id="ad-Acc">
              <span class="ct-product">Acc</span>
              <div class="ct-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>

          <form action="" class="acform-box">
            <input type="checkbox" id="ct-ac-checkbox" checked />
            <div class="ac-box" id="ad-Necklace">
              <span class="ac-product">Necklace</span>
              <div class="ac-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>

          <form action="" class="acform-box">
            <input type="checkbox" id="ct-ac-checkbox" checked />
            <div class="ac-box" id="ad-Earrings">
              <span class="ac-product">Earrings</span>
              <div class="ac-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>

          <form action="" class="acform-box">
            <input type="checkbox" id="ct-ac-checkbox" checked />
            <div class="ac-box" id="ad-Rings">
              <span class="ac-product">Rings</span>
              <div class="ac-button-box">
                <button class="button is-link edit-product">추가</button>
                <button class="button is-success edit-product">수정</button>
                <button class="button is-black edit-product">삭제</button>
              </div>
            </div>
          </form>

          </div>
          
          <div class="admin-ct-applybtn">
            <button class="button is-link edit-apply">변경 사항 적용</button>
            <button class="button is-black cancle-apply">취소</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
