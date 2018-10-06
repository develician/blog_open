import * as React from 'react';
import styles from './Contents.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// interface ContentsProps {}

const Contents: React.SFC<{}> = () => (
  <div className={cx('contents')}>
    <h1 className={cx('heading')}>Who Am I?</h1>
    <div className={cx('separator')} />
    <div className={cx('name')}>killi8n (킬리에이튼)</div>
    <div className={cx('short-desc')}>
      2017년도 부터 코딩에 입문했습니다. 늦게 코딩의 재미를 알게되었고, 점점 더 재밌어지는 중
      입니다.
      <br />
      트렌디하고 멋진 기술들을 알아가는 것을 좋아하고, 따분한 것은 별로라서 재밌게 하자는 마음가짐을
      갖고 코딩 합니다.
    </div>
    <h1 className={cx('heading')}>Stacks That I Like</h1>
    <div className={cx('separator')} />
    <div className={cx('my-stacks')}>
      <div className={cx('stack')}>React + Redux + Sass</div>
      <div className={cx('stack')}>Swift or RxSwift</div>
      <div className={cx('stack')}>Node.JS + MongoDB</div>
      <div className={cx('stack')}>Django</div>
    </div>
    <h1 className={cx('heading')}>Personal</h1>
    <div className={cx('separator')} />
    <div className={cx('short-desc')}>
      피해를 주지않는 삶을 살려고 노력합니다. 그 만큼 피해 받는 것도 싫어합니다. <br />
      고리타분하게 느껴지는 것들이 싫습니다. <br />
      감성적이나 파워풀한 음악을 즐깁니다. <br />
      음악을 좋아하고, Guitar 연주를 즐깁니다. <br />
      카타르시스를 주는 예술작품들을 좋아합니다. <br />
    </div>
    <h1 className={cx('heading')}>Education</h1>
    <div className={cx('separator')} />
    <div className={cx('short-desc')}>
      유한대 IT 소프트웨어공학과 3학년 2학기 재학 중. <br />
      관심있는 분야를 영어로 읽는 데에 문제 없음.
    </div>
    <h1 className={cx('heading')}>Contacts</h1>
    <div className={cx('separator')} />
    <div className={cx('my-stacks')}>
    <div className={cx('stack')}>killi8n@gmail.com</div>
    <div className={cx('stack')}>https://github.com/killi8n</div>
    </div>
  </div>
);

export default Contents;
