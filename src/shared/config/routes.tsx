import type { ReactNode } from 'react';

import { RequestListPage } from '../../pages/request-list';
import { CreateRequestPage } from '../../pages/create-request';
import { RequestDetailPage } from '../../pages/request-detail';

export const ROUTES = [
  {
    path: '/requests',
    title: 'Список заявок',
    element: <RequestListPage />,
  },
  {
    path: '/requests/new',
    title: 'Создать заявку',
    element: <CreateRequestPage />,
  },
  {
    path: '/requests/:id',
    title: 'Страница заявки',
    element: <RequestDetailPage />,
  },
] satisfies {
  path: string;
  title: string;
  element: ReactNode;
}[];
