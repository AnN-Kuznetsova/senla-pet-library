import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useSelector } from "react-redux";

import { BooksList } from "../components/books-list";
import { getBooks } from "../store/books/selectors";
import { withMockRedux } from "./decorators/with-mock-redux";


export default {
  title: 'BooksList',
  component: BooksList,
  decorators: [withMockRedux],
  argTypes: {},
} as ComponentMeta<typeof BooksList>;


const Template: ComponentStory<typeof BooksList> = (args) => {
  const books = useSelector(getBooks);

  return <BooksList {...args}
    books={books}
  />
};

export const Default = Template.bind({});
Default.args = {
  primary: true,
};
