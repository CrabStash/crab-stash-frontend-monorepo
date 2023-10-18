import type { Meta, StoryObj } from "@storybook/react";

import { Combobox } from ".";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const meta: Meta<typeof Combobox> = {
  title: "Components / Core / Combobox",
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    triggerLabel: "Select framework...",
    placeholder: "Search framework...",
    items: frameworks,
  },
};
