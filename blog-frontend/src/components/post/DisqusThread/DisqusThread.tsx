import * as React from 'react';
import styles from './DisqusThread.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SHORTNAME = 'killi8ns-blog';
const WEBSITE_URL = 'http://localhost:4000';

export interface DisqusThreadProps {
  id: string;
  title: string;
  path: string;
}

class DisqusThread extends React.Component<DisqusThreadProps, any> {
  public componentDidMount() {
    this.renderDisqus();
  }

  public componentDidUpdate() {
    this.renderDisqus();
  }

  public shouldComponentUpdate(nextProps: DisqusThreadProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    );
  }

  public renderDisqus = () => {
    if ((window as any).DISQUS === undefined) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://${SHORTNAME}.disqus.com/embed.js`;
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      (window as any).DISQUS.reset({ reload: true });
    }
  };

  public render() {
    const { id, title, path, ...other } = this.props;

    if (process.env.BROWSER) {
      (window as any).disqus_shortname = SHORTNAME;
      (window as any).disqus_identifier = id;
      (window as any).disqus_title = title;
      (window as any).disqus_url = WEBSITE_URL + path;
    }
    return <div className={cx('DisqusFrame')} {...other} id="disqus_thread" />;
  }
}

export default DisqusThread;
