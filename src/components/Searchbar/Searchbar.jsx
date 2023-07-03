import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar(props) {

  const [itemToSearch, setItemToSearch] = useState('')

  
  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit(itemToSearch);
  };

  const onChange = e => {
    setItemToSearch( e.target.value );
  };
  const reset = () => {
    setItemToSearch('')
  }

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={onChange}
            onClick={reset}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={itemToSearch}
          />
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};