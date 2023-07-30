import './Header.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/imgs/github_original_wordmark_logo_icon_146506.svg';

export default function Header() {
  return (
    <div className="header container">
      <div className="header__inner container__row">
        <div className="header__logo">
          <Link to="/">
            <div className="header__logo_wrapper">
              <div className="header__logo_img">
                <Logo className="" />
              </div>
            </div>
          </Link>
        </div>
        <Search />
      </div>
    </div>
  );
}
