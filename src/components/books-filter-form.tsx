import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";
import {useEffect, useCallback, useMemo, useState} from "react";

import {debounced} from "../utils";
import type {BookFilterType} from "../types";


interface PropsType {
  setBooksFilter: (payload: BookFilterType) => void;
}


const BooksFilterForm: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const {setBooksFilter} = props;
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");

  const handleInputTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputAutorSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const setFilter = useCallback(() => {
    setBooksFilter({
      title,
      autor,
    });
  }, [title, autor, setBooksFilter]);

  const debouncedSetFilter = useMemo(
    () => debounced(setFilter),
    [setFilter]
  );

  useEffect(() => {
    debouncedSetFilter();
    return debouncedSetFilter.cancel;
  }, [title, autor, debouncedSetFilter]);

  return (
    <form className="form">
      <FormControl className="form__field-control">
        <InputLabel htmlFor="book-title-filter">Введите название книги</InputLabel>
        <Input
          id="book-title-filter"
          name="book-title-filter"
          type="text"
          value={title}
          onChange={handleInputTitleSearchChange}
        />
      </FormControl>
      <FormControl className="form__field-control">
        <InputLabel htmlFor="book-autor-filter">Введите автора</InputLabel>
        <Input
          id="book-autor-filter"
          name="book-autor-filter"
          type="text"
          value={autor}
          onChange={handleInputAutorSearchChange}
        />
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
