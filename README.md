# Crab Stash monorepo (Next.js, React, Astro, TypeScript, Docker, ESLint, Jest, Prettier, Tailwind, Storybook)

## What's inside?

This turborepo uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

### Apps and Packages architecture

```md
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ landing
  |    └─ Astro app
  ├─ app
  |    └─ Next.js app
  |
  └─ docs
       └─ Next.js app
packages
 ├─ ui
 |   └─ a stub React component library shared by apps created with Storybook.js
 ├─ tsconfig
 |   └─ `tsconfig.json`s used throughout the monorepo
 └─ linting
     └─ `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
```

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
- [GitHub Actions](https://docs.github.com/en/actions) for publishing the component library
- [Docker](https://www.docker.com/) as an alternative build/development tool
- [Tailwind](https://tailwindcss.com/) a utility first css framework for styling
- [Storybook.js](https://storybook.js.org/) build component driven UIs faster

### **Build**

To build all apps and packages, run the following command:

```sh
cd turborepo-starter
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd turborepo-starter
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```sh
cd turborepo-starter
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
