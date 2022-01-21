import * as Enzyme from "enzyme";
import * as Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "regenerator-runtime/runtime";

Enzyme.configure({
  adapter: new Adapter(),
});
