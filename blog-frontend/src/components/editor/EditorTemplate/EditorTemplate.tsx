import * as React from 'react';
import styles from './EditorTemplate.scss';
import * as classNames from 'classnames/bind';

interface EditorTemplateProps {
  header: any;
  editor?: any;
  preview: any;
}

const cx = classNames.bind(styles);

class EditorTemplate extends React.Component<EditorTemplateProps> {
  public state = {
    leftPercentage: 0.5,
  };

  public handleMouseMove = (e: any): void => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth,
    });
  };

  public handleMouseUp = () => {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  public handleSeparatorMouseDown = () => {
    document.body.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  public render() {
    const { header, editor, preview } = this.props;
    const { leftPercentage } = this.state;
    const leftStyle = {
      flex: leftPercentage,
    };
    const rightStyle = {
      flex: 1 - leftPercentage,
    };
    const separatorStyle = {
      left: `${leftPercentage * 100}%`,
    };

    return (
      <div className={cx('EditorTemplate')}>
        {header}
        <div className={cx('Panes')}>
          <div className={cx('Pane', 'Editor')} style={leftStyle}>
            {editor}
          </div>
          <div className={cx('Pane', 'Preview')} style={rightStyle}>
            {preview}
          </div>
          <div
            className={cx('Separator')}
            style={separatorStyle}
            onMouseDown={this.handleSeparatorMouseDown}
          />
        </div>
      </div>
    );
  }
}

export default EditorTemplate;
