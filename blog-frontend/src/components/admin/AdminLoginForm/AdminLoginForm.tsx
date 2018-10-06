import * as React from 'react';
import styles from './AdminLoginForm.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

interface AdminLoginFormProps {
  username: string;
  password: string;
  onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void;
  onLogin(): void;
}

const AdminLoginForm: React.SFC<AdminLoginFormProps> = ({
  username,
  password,
  onChangeInput,
  onLogin,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };
  return (
    <div className={cx('Form')}>
      <Link to="/" className={cx('Logo')}>
        killi8n's Blog
      </Link>
      <div className={cx('Line')}>
        <div className={cx('Label')}>아이디</div>
        <div className={cx('Input')}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChangeInput}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className={cx('Line')}>
        <div className={cx('Label')}>비밀번호</div>
        <div className={cx('Input')}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangeInput}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className={cx('Button')}>
        <Button theme="Login" onClick={onLogin}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default AdminLoginForm;
