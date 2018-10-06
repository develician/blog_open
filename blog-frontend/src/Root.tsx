import * as React from 'react';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from 'store/configure';

if (typeof window === 'undefined') {
  (global as any).window = {};
}

const preloadedState = (window as any).__PRELOADED_STATE__;

const store = configure(preloadedState);

// interface RootProps {}

const Root: React.SFC<{}> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
