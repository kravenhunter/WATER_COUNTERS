import { HomePage, Page404 } from '@pages';
import { Route, Routes } from 'react-router-dom';

export const RoutesNavigation = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
};
