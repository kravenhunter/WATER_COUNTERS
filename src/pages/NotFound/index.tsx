import { Link } from 'react-router-dom';

//Страница ошибки
export const Page404 = () => {
  return (
    <div className='grid gap-5 justify-items-center'>
      <h1>Страница ненайдена</h1>
      <Link
        to={'/'}
        className='w-[120px] bg-teal-600 text-center rounded-md p-4 text-white hover:bg-teal-500'>
        На главную
      </Link>
    </div>
  );
};
