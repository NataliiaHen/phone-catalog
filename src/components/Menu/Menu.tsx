import './Menu.scss';
import React, { memo } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { NavIcon } from '../NavIcon';
import { Logo } from '../Logo';

type Props = {
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = memo(({ closeMenu }) => (
  <aside className="menu">
    <div className="menu__top">
      <Logo />

      <div className="menu__icon-link menu__icon-link--close">
        <NavIcon>
          <ReactSVG
            src="img/icons/Close.svg"
            onClick={closeMenu}
          />
        </NavIcon>
      </div>
    </div>

    <ul className="menu__list">
      <li className="menu__item">
        <Link
          to="/"
          className="menu__link"
          onClick={closeMenu}
        >
          Home
        </Link>
      </li>

      <li className="menu__item">
        <Link
          to="/phones"
          className="menu__link"
          onClick={closeMenu}
        >
          Phones
        </Link>
      </li>

      <li className="menu__item">
        <Link
          to="/tablets"
          className="menu__link"
          onClick={closeMenu}
        >
          Tablets
        </Link>
      </li>

      <li className="menu__item">
        <Link
          to="/accessories"
          className="menu__link"
          onClick={closeMenu}
        >
          Accessories
        </Link>
      </li>
    </ul>
  </aside>
));
