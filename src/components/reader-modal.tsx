import * as React from "react";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {BooksList, BooksListMode} from "./books-list/books-list";
import {getReaderById} from "../store/readers/selectors";
import {updateReader} from "../store/readers/readers";
import {getFilteredBooks} from "../store/application/selectors";
import {getBooksByIds} from "../store/books/selectors";


interface PropsType {
  readerId: string,
}


/* const formatDate = (date: moment.Moment | null): string | null => {
  return date ? date.format(`DD MMMM YYYY`) : null;
}; */


export const ReaderModal: React.FC<PropsType> = (props: PropsType) => {
  const {readerId} = props;

  const dispatch = useDispatch();

  const reader = useSelector(getReaderById(readerId));
  const allBooks = useSelector(getFilteredBooks);
  const takenBooksCount = reader.books.length;
  const takedBooks = useSelector(getBooksByIds(reader.books.map((book) => book.id)));

  const [isBookChoice, setIsBookChoice] = useState(false);

  const handleReturnBookButtonClick = (bookId: string) => {
    const newBooks = reader.books.filter((book) => book.id !== bookId);
    dispatch(updateReader(Object.assign({}, reader, {books: newBooks})));
  };

  const handleTakeButtonClick = () => {
    setIsBookChoice(true);
  };

  return (
    <>
      {/* isChange &&
        <BookInfoForm
          book={book}
          onCancelButtonClick={closeChangeWindow}
          onSubmit={closeChangeWindow}
        />
        || */
        <div className="reader-modal">
          <div className="reader-modal__info">
            <Typography variant="h5">{reader.name}</Typography>
            <div style={{display: "flex"}}>
              <p style={{marginTop: "0"}}>age: {reader.age}</p>
              <Button
                variant="contained"
                style={{marginLeft: "auto"}}
                onClick={handleTakeButtonClick}
              >Take a book</Button>
            </div>

            {isBookChoice &&
              <BooksList
                books={allBooks}
                mode={BooksListMode.BOOK_CHOICE}
                onBookButtonClick={()=>{}}
            />}

            <Typography variant="h6">Taken Books: {takenBooksCount}</Typography>
            {!isBookChoice && !!takenBooksCount &&
              <BooksList
                books={takedBooks}
                mode={BooksListMode.TAKED_BOOKS}
                onBookButtonClick={handleReturnBookButtonClick}
            />}

            {/* <FormButtonControlls
              buttons={[{
                type: FormButtonControllsType.CHANGE,
                onClick: changeButtonClickHandler,
              }]}
            /> */}
          </div>
        </div>
      }
    </>
  );
};
