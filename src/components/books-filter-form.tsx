import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";
import {useDispatch} from "react-redux";
import {useEffect, useCallback, useMemo, useState} from "react";

import {debounced} from "../utils";
import {setBooksFilter} from "../store/application/application";


export const BooksFilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");

  const handleInputTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputAutorSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const setFilters = useCallback(() => {
    dispatch(setBooksFilter({
      title,
      autor,
    }));
  }, [title, autor, dispatch]);

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
