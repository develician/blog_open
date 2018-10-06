import * as React from 'react';

export default function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    constructor(props) {
      super(props);
      if (AsyncComponent.Component) {
        return;
      }
      getComponent().then(({ default: Component }) => {
        AsyncComponent.Component = Component;
        // 여기가 constructor 이긴 하지만 이 함수는 비동기적으로 작동하기에
        // 실질적으로는 컴포넌트가 마운트 되고 나서 실행되기 때문에 this.state.Component = ... 가 아닌
        // this.setState(...) 로 진행합니다.
        this.setState({ Component });
      });
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
