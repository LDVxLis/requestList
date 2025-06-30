import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../shared/config/routes';

export const Router = () => (
  <Routes>
    {/* Переход нужен из-за требования ТЗ - реализовать конкретные три страницы  */}
    <Route path="/" element={<Navigate to="/requests" replace />} />

    {ROUTES.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);
