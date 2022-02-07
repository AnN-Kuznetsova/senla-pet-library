import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";
import {useEffect, useCallback, useMemo, useState} from "react";
import {useFormik} from "formik";

import {debounced} from "../utils";
import type {BookFilterType} from "../types";


interface PropsType {
  setBooksFilter: (payload: BookFilterType) => void,
}


const BooksFilterForm: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const {setBooksFilter} = props;

  const formik = useFormik({
    initialValues: {
      filterTitle: ``,
      filterAutor: ``,
    },
    onSubmit: () => {/**/},
  });

  const setFilter = useCallback(() => {
    setBooksFilter({
      title: formik.values.filterTitle,
      autor: formik.values.filterAutor,
    });
  }, [formik.values.filterTitle, formik.values.filterAutor, setBooksFilter]);

  const debouncedSetFilter = useMemo(
    () => debounced(setFilter),
    [setFilter]
  );

  useEffect(() => {
    debouncedSetFilter();
    return debouncedSetFilter.cancel;
  }, [formik.values.filterTitle, formik.values.filterAutor, debouncedSetFilter]);

  return (
    <form className="form" >
      <FormControl className="form__field-control">
        <InputLabel htmlFor="filterTitle">Введите название книги</InputLabel>
        <Input id="filterTitle" name="filterTitle" type="text" value={formik.values.filterTitle} onChange={formik.handleChange} />
      </FormControl>
      <FormControl className="form__field-control">
        <InputLabel htmlFor="filterAutor">Введите автора</InputLabel>
        <Input id="filterAutor" name="filterAutor" type="text" value={formik.values.filterAutor} onChange={formik.handleChange} />
      </FormControl>
    </form>
  );
};


const useBooksFilter = () => {
  const [booksFilter, setBooksFilter]: [BookFilterType, (filter: BookFilterType) => void] = useState({});

  const getBooksFilter = () => booksFilter;

  const renderBooksFilter = () => (
    <BooksFilterForm setBooksFilter={setBooksFilter} />
  );

  return {
    renderBooksFilter,
    getBooksFilter,
  };
};


export {
  BooksFilterForm,
  useBooksFilter,
};
