import * as React from 'react';
import './Nanobar.scss';
// import * as classNames from 'classnames/bind';
import Nano from 'nanobar';

// const cx = classNames.bind(styles);

// interface NanobarProps {}
class Nanobar extends React.Component<{}> {
  public nanobar = null;
  public componentDidMount() {
    this.nanobar = new Nano({
      classname: 'Nanobar__bar___2d454',
      id: 'nanobar',
    });
    (window as any).nanobar = this.nanobar;
  }

  public remove = () => {
    (window as any).nanobar = null;
    delete this.nanobar;
  };

  public render() {
    return null;
  }
}

export default Nanobar;
