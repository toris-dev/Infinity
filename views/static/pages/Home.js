import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  getCss() {
    return './static/css/home.css';
  }
  getJs() {
    return './static/js/home.js';
  }

  async getHtml() {
    return `
    <div class="main-img">
    <div>
        <a>
            <img src="/static/images/main-img3.png">
        </a>
    </div>
    </div>
    <div class="title">
    <div class="main_line"></div>
    <h2>Weekly Best</h2>
    </div>
    <div class="weekly-best">
    <div class="main swiper">
        <div class="swiper-wrapper">
        <!-- Slides -->
            <div class="swiper-slide">
                <img src="/static/images/Mask group.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-1.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-2.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-1.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-2.png">
            </div>
    
        </div>
        
    </div>
    <div class="swiper-button-prev">
        <img src="/static/images/arrow.png">
    </div>
    <div class="swiper-button-next">
        <img class="rotate" src="/static/images/arrow.png">
    </div>
    </div>
    
    <div class="title">
    <div class="main_line"></div>
    <h2>New Arrival</h2>
    </div>
    <div class="New-arrival">
    <ul>
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
