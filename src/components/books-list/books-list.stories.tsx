import * as React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {useSelector} from "react-redux";


import {BooksList, BooksListMode} from "./books-list";
import {getBooks, getBooksByIds, getFreeBooks} from "../../store/books/selectors";
import {getReaders} from "../../store/readers/selectors";
import {withMockRedux} from "../../stories/decorators/with-mock-redux";

export default {
  title: "BooksList",
  component: BooksList,
  decorators: [withMockRedux],
  argTypes: {},
} as ComponentMeta<typeof BooksList>;


const Template: ComponentStory<typeof BooksList> = (args) => {
  const {mode} = args;
  const onBookButtonClick = () => {/**/};

  const readers = useSelector(getReaders);

  let books = useSelector(getBooks);
  const freeBooks = useSelector(getFreeBooks);
  const takedBooks = useSelector(getBooksByIds(readers[1].books.map((book) => book.id)));

  switch (mode) {
  case BooksListMode.BOOK_CHOICE:
    books = freeBooks;
    break;
  case BooksListMode.TAKED_BOOKS:
    books = takedBooks;
    break;
  }

  return <BooksList
    books={books}
    mode={mode}
    onBookButtonClick={onBookButtonClick}
  />
};

export const Default = Template.bind({});
Default.args = {
  mode: BooksListMode.DEFAULT,
};

export const BookChoice = Template.bind({});
BookChoice.args = {
  mode: BooksListMode.BOOK_CHOICE,
};

export const TakedBooks = Template.bind({});
TakedBooks.args = {
  mode: BooksListMode.TAKED_BOOKS,
};
