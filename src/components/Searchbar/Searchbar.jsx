// import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';

import { Forms } from './Searchbar.styled';

const initialValues = {
  valueImg: '',
};

export const SearchBar = onSubmit => {
  const handleSubmit = (values, actions) => {
    console.log(values);
  };
  return (
    <Forms>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <header className="searchbar">
          <Form className="form">
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>
            <Field
              className="input"
              type="text"
              name="valueImg"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        </header>
      </Formik>
    </Forms>
  );
};
