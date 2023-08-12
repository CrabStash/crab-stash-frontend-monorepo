import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./button.stories";

const { Primary } = composeStories(stories);

test("renders default button with default args", () => {
  render(<Primary />);

  const buttonElement = screen.getByText(/Button/i);

  expect(buttonElement).not.toBeNull();
});
