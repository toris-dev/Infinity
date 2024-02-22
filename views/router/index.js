// import { getParams, navigateTo, pathToRegex } from './navigate.js';
import { getParams, pathToRegex } from './navigate.js';
import { routes } from './routes.js';

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // route에 정의된 곳으로 이동하지 않는다면 기본값으로 되돌린다.
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const view = new match.route.view(getParams(match));

  // contents_main element 에 추가
  document.querySelector('#container>#contents_main').innerHTML =
    await view.getHtml();

  // head 에 css 코드 추가
  const linkCss = document.getElementById('mycss');
  linkCss.href = view.getCss();

  // body 에 추가할 js 코드 추가
  document.head.appendChild(
    Object.assign(document.getElementById('myjs'), {
      src: view.getJs(),
      type: 'module'
    })
  );
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
