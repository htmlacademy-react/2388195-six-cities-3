import MainPage from './../pages/main-page/main-page';
import Header from './header';

export default function App(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header/>
      <MainPage/>
    </div>
  );
}
