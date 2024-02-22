import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('로그인');
  }

  getCss() {
    return './static/css/login.css';
  }

  getJs() {
    return './static/js/login.js';
  }

  async getHtml() {
    // console.log(this.params); // params 불러오기 가능
    return `
    <div>
      <div class="login">
        <fieldset>
            <legend>회원로그인</legend>
            <label class="id" title="ID">
                <input type="text" placeholder="ID">
            </label>
            <label class="password" title="Password">
                <input type="text" placeholder="Password">
            </label>
            <a href="#" class="btnLogin">Login</a>
            <ul class="forgot">
                <li><a>Forgot ID</a></li>
                <li><a>Fogot Password</a></li>
            </ul>
            <a href="#" class="btnJoin">Register</a>
            </fieldset>
        </div>
    </div>
        `;
  }
}
