import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";
import {useEffect, useCallback, useMemo, useState} from "react";

import {debounced} from "../utils";
import { FilterType } from "../types";


interface PropsType {
  setBooksFilter: (payload: FilterType) => void,
}


const BooksFilterForm: React.FC<PropsType> = (props: PropsType) => {
  const {setBooksFilter} = props;
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");

  const handleInputTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputAutorSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const setFilters = useCallback(() => {
    setBooksFilter({
      title,
      autor,
    });
  }, [title, autor, setBooksFilter]);

  const debouncedSetFilters = useMemo(
    () => debounced(setFilters),
    [setFilters]
  );

  useEffect(() => {
    debouncedSetFilters();
    return debouncedSetFilters.cancel;
  }, [title, autor, debouncedSetFilters]);

  return (
    <form className="form" >
      <FormControl className="form__field-control">
        <InputLabel htmlFor="book-title-filter">Введите название книги</InputLabel>
        <Input id="book-title-filter" name="book-title-filter" type="text" value={title} onChange={handleInputTitleSearchChange} />
      </FormControl>
      <FormControl className="form__field-control">
        <InputLabel htmlFor="book-autor-filter">Введите автора</InputLabel>
        <Input id="book-autor-filter" name="book-autor-filter" type="text" value={autor} onChange={handleInputAutorSearchChange} />
      </FormControl>
    </form>
  );
};


const useBooksFilter = () => {
  const [booksFilters, setBooksFilter]: [FilterType, (filter: FilterType) => void] = useState({});

  const getBooksFilter = () => booksFilters;

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
