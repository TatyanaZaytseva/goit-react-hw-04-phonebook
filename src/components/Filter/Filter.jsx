import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from 'components/Filter/Filter.module.css';

export const Filter = ({ filter, onFilter }) => {
  const inputID = nanoid();

  return (
    <section className={css.section_filter}>
      <label htmlFor={inputID} className={css.label}>
        Find contacts by name:
        <input
          id={inputID}
          type="text"
          value={filter}
          name="filter"
          onChange={onFilter}
          className={css.input}
        ></input>
      </label>
    </section>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func,
};
