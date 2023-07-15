import type { Meta, StoryObj } from "@storybook/react";

import type { TypographyProps } from ".";
import { Typography } from ".";

const meta: Meta<typeof Typography> = {
  title: "Components / Core / Typography",
  component: Typography,
};

export default meta;

export const H1: StoryObj<TypographyProps<"h1">> = {
  args: {
    as: "h1",
    children: "Heading 1",
  },
};

export const H2: StoryObj<TypographyProps<"h2">> = {
  args: {
    as: "h2",
    children: "Heading 2",
  },
};

export const H3: StoryObj<TypographyProps<"h3">> = {
  args: {
    as: "h3",
    children: "Heading 3",
  },
};

export const H4: StoryObj<TypographyProps<"h4">> = {
  args: {
    as: "h4",
    children: "Heading 4",
  },
};

export const P: StoryObj<TypographyProps<"p">> = {
  args: {
    as: "p",
    children: "Paragraph",
  },
};

export const Span: StoryObj<TypographyProps<"span">> = {
  args: {
    as: "span",
    children: "Span",
  },
};

export const Li: StoryObj<TypographyProps<"li">> = {
  args: {
    as: "li",
    children: "List Item",
  },
};
