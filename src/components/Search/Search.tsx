import './Search.scss';
import { debounce } from 'lodash';
import React, {
  useRef, useState, memo,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { SearchParams, getSearchWith } from '../../helpers/searchHelpers';

type Props = {
  closeSearch?: () => void;
  isSearchOpen?: boolean;
};

export const Search: React.FC<Props> = memo(({ closeSearch, isSearchOpen = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(searchQuery);
  const [appliedQuery, setAppliedQuery] = useState(searchQuery);

  const searchInput = useRef<HTMLInputElement>(null);

  const { pathname } = useLocation();

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleAppliedChange = (
    newQuery: string,
  ) => {
    setAppliedQuery(newQuery);
    setSearchWith({
      query: newQuery || null,
      page: null,
      perPage: null,
      sort: null,
    });
  };

  const applyQuery = debounce(handleAppliedChange, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSearchFocus = () => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const handleResetSearch = () => {
    setSearchWith({ query: null });

    setQuery('');
    applyQuery('');

    if (isSearchOpen && closeSearch) {
      closeSearch();
    }
  };

  return (
    <div className="search">
      <input
        data-cy="ProductFilter"
        type="search"
        className="search__input"
        value={query}
        onChange={handleSearchChange}
        ref={searchInput}
        placeholder={`Search in ${pathname.split('/')[1]}...`}
      />
      {appliedQuery && null}

      <div className="search__icon-container">
        {(query || isSearchOpen) ? (
          <button
            className="search__icon-box"
            data-cy="searchDelete"
            onClick={handleResetSearch}
            type="button"
          >
            <ReactSVG
              src="img/icons/Close.svg"
            />
          </button>
        ) : (
          <div
            className="search__icon-box"
            onClick={handleSearchFocus}
            aria-hidden
          >
            <ReactSVG
              src="img/icons/Search.svg"
            />
          </div>
        )}
      </div>

    </div>
  );
});
