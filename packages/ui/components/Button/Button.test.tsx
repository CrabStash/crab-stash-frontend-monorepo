import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./Button.stories";

const { Playground } = composeStories(stories);

test("renders default button with default args", () => {
  render(<Playground />);

  const buttonElement = screen.getByText(/Button/i);

  expect(buttonElement).not.toBeNull();
});
