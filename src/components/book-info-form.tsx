import * as React from "react";
import * as Yup from "yup";
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";

import {BookCover} from "./book-cover";
import {DEFOULT_COVER_IMGURL, FetchStatus} from "../const";
import {FormButtonControlls, FormButtonControllsType} from "./form-button-controls";
import {Info, InfoType} from "./info";
import {addNewBook, resetBooksStatus, updateBook} from "../store/books/books";
import {getBooksError, getBooksStatus} from "../store/books/selectors";
import {useWaitShow} from "../utils";
import type {BookType} from "../types";
import type {ControllButtonType} from "./form-button-controls";


interface PropsType {
  book?: BookType,
  onCancelButtonClick?: () => void,
  onSubmit?: () => void,
}


const validationSchema = Yup.object({
  title: Yup.string()
    .required(`Title is required.`),
  autor: Yup.string()
    .required(`Autor is required.`),

});


export const BookInfoForm: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const {
    book,
    onCancelButtonClick,
    onSubmit,
  } = props;

  const dispatch = useDispatch();
  const status = useSelector(getBooksStatus);
  const error = useSelector(getBooksError);
  const isWaitShow = useWaitShow(status);

  const formik = useFormik({
    initialValues: {
      title: book ? book.title : "",
      autor: book ? book.autor : "",
      coverImgUrl: book ? book.coverImgUrl : DEFOULT_COVER_IMGURL,
    },
    validationSchema,
    onSubmit: (values) => {
      const newBookData = {
        id: book ? book.id : ``,
        title: values.title,
        autor: values.autor,
        coverImgUrl: values.coverImgUrl,
      };

      if (book) {
        dispatch(updateBook({
          book: newBookData,
          onSubmit,
        }));
      } else {
        dispatch(addNewBook(newBookData));
      }
    },
    initialTouched: {
      title: false,
      autor: false,
    },
  });

  const handleCoverImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      formik.setFieldValue(`coverImgUrl`, reader.result);
    };

    reader.readAsDataURL(imgFile);
  };

  const isNewData = book ? (formik.values.title !== book.title || formik.values.autor !== book.autor || formik.values.coverImgUrl !== book.coverImgUrl)
    : Object.values(formik.touched).every((touch) => touch === true);

  const handleErrorComponentClick = () => {
    dispatch(resetBooksStatus());
  };

  const controllButtons: ControllButtonType[] = [];
  controllButtons.push({
    type: FormButtonControllsType.SAVE,
    isDisabled: !(formik.isValid  && isNewData),
    isSubmit: true,
    });

  if (onCancelButtonClick) {
    controllButtons.push({
      type: FormButtonControllsType.CANCEL,
      onClick: onCancelButtonClick,
    })
  }

  return (
    <React.Fragment>
      <form
        className="form  book-modal"
        onSubmit={formik.handleSubmit}
      >
        <div className="form__field-control  form__field-control--img-loader" >
          <BookCover coverImgUrl={formik.values.coverImgUrl} />

          <label htmlFor="coverImgUrl" className="form__load-button">
            <input
              id="coverImgUrl"
              name="coverImgUrl"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleCoverImgUrlChange}
              hidden
            />
            <Button variant="outlined" component="span">
              Загрузить...
            </Button>
          </label>
        </div>

        <div className="book-modal__info">
          <FormControl
            className="form__field-control"
            error={!!formik.touched.title && !!formik.errors.title}

          >
            <InputLabel htmlFor="title">Введите название</InputLabel>
            <Input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus={true}
            />
          </FormControl>

          <FormControl
            className="form__field-control"
            error={!!formik.touched.autor && !!formik.errors.autor}
          >
            <InputLabel htmlFor="autor">Введите автора</InputLabel>
            <Input
              id="autor"
              name="autor"
              type="text"
              value={formik.values.autor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          <FormButtonControlls buttons={controllButtons} />
        </div>
      </form>

      {isWaitShow &&
        <div className="absolute">
          <Info type={InfoType.WAIT} />
        </div>
      }

      {status === FetchStatus.REJECTED &&
        <div
          className="absolute absolute--clickable"
          onClick={handleErrorComponentClick}
        >
          <Info type={InfoType.ERROR} error={error} />
        </div>
      }
  </React.Fragment>
  );
};
