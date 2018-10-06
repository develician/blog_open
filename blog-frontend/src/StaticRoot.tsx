import * as React from 'react';
import App from 'components/App';
// import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from 'store/configure';

if (typeof window === 'undefined') {
  (global as any).window = {};
}

const preloadedState = (window as any).__PRELOADED_STATE__;

const store = configure(preloadedState);

// interface RootProps {
//   location: any;
// }

const Root: React.SFC<{}> = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
