import * as React from 'react';
// import styles from './DropImage.scss';
// import * as classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

interface DropImageProps {
  onDragEnter(e: any): void;
  onDragLeave(e: any): void;
  onPasteImage(file: any): void;
  onDrop(e: any): void;
}

class DropImage extends React.Component<DropImageProps> {
  public componentDidMount() {
    this.applyListeners();
  }

  public applyListeners = () => {
    if (window) {
      window.addEventListener('drop', this.props.onDrop);
      window.addEventListener('dragenter', this.props.onDragEnter);
      window.addEventListener('dragleave', this.props.onDragLeave);
    }
    if (document && document.body) {
      document.body.addEventListener('paste', this.props.onPasteImage);
    }
  };

  public render() {
    return <div />;
  }
}

export default DropImage;
