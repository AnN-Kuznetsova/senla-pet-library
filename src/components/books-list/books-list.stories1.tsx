/* import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useSelector } from "react-redux";

import { BooksList } from "./books-list";
import { getBooks } from "../../store/books/selectors";
import { withMockRedux } from "../../stories/decorators/with-mock-redux";


export default {
  title: 'BooksList',
  component: BooksList,
  decorators: [withMockRedux],
  argTypes: {},
} as ComponentMeta<typeof BooksList>;


const Template: ComponentStory<typeof BooksList> = (args) => {
  const books = useSelector(getBooks);
  const openModal = () => {/**//*};

  return <BooksList {...args}
    books={books}
    openModal={openModal}
  />
};

export const Default = Template.bind({});
Default.args = {};
 */
