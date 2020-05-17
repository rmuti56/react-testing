import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state fro setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = shallow(<App />);
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
test("renders increment button", () => {
  const wrapper = shallow(<App />);
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});
test("renders counter disply", () => {
  const wrapper = shallow(<App />);
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});
test("counter start at 0", () => {
  const wrapper = shallow(<App />);
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});
test("clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = shallow(<App />);
  wrapper.setState({ counter });

  // find button and click
  const button = wrapper.find(`[data-test="increment-button"]`);
  button.simulate("click");

  // find display and test value
  const counterDisplay = wrapper.find(`[data-test="counter-display"]`);
  expect(counterDisplay.text()).toContain(counter + 1);
});
