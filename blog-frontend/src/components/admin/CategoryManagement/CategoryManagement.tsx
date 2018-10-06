import * as React from 'react';
import styles from './CategoryManagement.scss';
import * as classNames from 'classnames/bind';
import Button from 'components/common/Button';
import { Category } from 'store/modules/category';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Body = styled.div`
  margin-top: 0.5rem;
`;

const Content = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius: 3px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
  padding-left: 0.25rem;
  margin-bottom: 8px;
`;

const Item = styled.div`
  flex: 1;
  font-size: 1.25rem;
  color: white;
`;

const cx = classNames.bind(styles);

interface CategoryManagementProps {
  categories: Category[];
  showModal(what: string): void;
  onSelectCategory(id: string): void;
}

const CategoryManagement: React.SFC<CategoryManagementProps> = ({
  showModal,
  categories,
  onSelectCategory,
}) => {
  const handleShowModal = e => {
    onSelectCategory(e.target.id);
    showModal('category');
  };

  const handleShowAddmodal = () => {
    showModal('addCategory');
  };

  const categoryList = categories.map((category, i) => {
    return (
      <Draggable key={category._id} draggableId={category._id} index={i}>
        {(provided, snapshot) => (
          <Content
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={category._id}
          >
            <Item>{category.category}</Item>
            <Item>
              <Button id={category._id} theme="outline" onClick={handleShowModal}>
                삭제
              </Button>
            </Item>
          </Content>
        )}
      </Draggable>
    );
  });

  return (
    <div className={cx('Wrapper')}>
      <div className={cx('Title')}>Category 관리</div>
      <div className={cx('PaddingWrapper')}>
        <div className={cx('Button')}>
          <Button theme="outline" onClick={handleShowAddmodal}>
            카테고리 추가
          </Button>
        </div>
        <div className={cx('Table')}>
          <div className={cx('Header')}>
            <div className={cx('Head')}>카테고리 이름</div>
            <div className={cx('Head')}>관리</div>
          </div>
          <Droppable droppableId={`categoryDroppableId`}>
            {(provided, snapshot) => {
              return (
                <Body innerRef={provided.innerRef} {...provided.droppableProps}>
                  {categoryList}
                </Body>
              );
            }}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
