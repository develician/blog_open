import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router';
// import { Provider } from 'react-redux';
import configure from 'store/configure';
import { Helmet } from 'react-helmet';
// import PostDetailContainer from 'containers/post/PostDetailContainer';
// import transit from 'transit-immutable-js';
import routes from 'routes';
import axios from 'axios';

// import App from './components/App';
import Root from 'StaticRoot';
// import App from 'components/App';

// Helmet.canUseDOM = false;
const render = async ctx => {
  const { url, origin } = ctx; // 요청에서 URL 을 받아옵니다.
  axios.defaults.baseURL = origin;

  const store = configure();

  const promises = [];

  routes.forEach(async route => {
    const match = matchPath(url, route);
    // console.log('match', match);
    if (!match) {
      return;
    }
    const { component } = route as any;
    const { preload } = component;
    if (!preload) {
      return;
    }
    const { params } = match;
    // console.log('ssr params', params);
    const promise = preload(store.dispatch, params);
    // await Promise.resolve(promise);
    (promises as any).push(promise);
  });

  try {
    await Promise.all(promises);
  } catch (e) {
    //
    // console.log(e);
  }

  const context = {};

  // renderToString 은 렌더링된 결과물을 문자열로 만들어줍니다.
  // 서버에서는 BrowserRouter 대신에 StaticRouter 를 사용합니다.
  const html = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { context, location: url }, React.createElement(Root))
  );

  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const helmet = Helmet.renderStatic();
  return { html, preloadedState, helmet };
};

export default render;
