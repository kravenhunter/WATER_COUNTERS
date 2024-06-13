import { StoreProvider } from '@/store/storeProvider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './modules';
import './styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreProvider>
      <DefaultLayout />
    </StoreProvider>
  </BrowserRouter>
);
