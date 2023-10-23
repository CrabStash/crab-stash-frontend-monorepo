import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import { Button, Dropdown } from "@crab-stash/ui";

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Dropdown
        trigger={
          <Button variant="outline" className="w-8 h-8 rounded-full">
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
        label="Choose a theme"
        itemGroups={[
          [
            {
              label: "Light",
              onClick: () => setTheme("light"),
            },
            {
              label: "Dark",
              onClick: () => setTheme("dark"),
            },
            {
              label: "System",
              onClick: () => setTheme("system"),
            },
          ],
        ]}
      />
    </>
  );
}

export default ThemeToggle;
