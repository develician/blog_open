import { PostDetail, ListPage, AdminBigDoor, EditorPage, Management } from 'pages';

export default [
  {
    component: ListPage,
    exact: true,
    path: '/',
  },
  {
    component: ListPage,
    exact: true,
    path: '/temporary',
  },
  {
    component: Management,
    exact: true,
    path: '/category',
  },
  {
    component: ListPage,
    path: '/page/:page',
  },
  {
    component: ListPage,
    path: '/tag/:tag/:page?',
  },
  {
    component: ListPage,
    path: '/category/:category/:page?',
  },
  {
    component: AdminBigDoor,
    exact: true,
    path: '/admin',
  },
  {
    component: EditorPage,
    path: '/editor',
  },
  {
    component: PostDetail,
    path: '/post/:id',
  },
];
