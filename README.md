# kth.it

This repository contains the source code for [kth.it](https://kth.it), the website of the IT-Chapter at KTH.

The site is built with [Next.JS](https://nextjs.org) using TypeScript. Right now, all site data (such as trustees and committees) is hard coded, but the plan is to implement simple CRUD operations so that the content can be managed through some sort of admin interface.

## Development

### Prerequisites

You will need:

- [Node.js](https://nodejs.org/en)
- [PNPM](https://pnpm.io/)

1. Clone this repository
1. Install dependencies (`pnpm install`)

When you are ready, start the development server (`pnpm dev`)

Happy hacking!

### Caveats

Due to [the i18n library we are using](https://next-international.vercel.app/) we have to do some workarounds to mark pages as static, which is why the seasoned Next.js developer might notice some seemingly weird code around the pages. See the [next-international docs](https://next-international.vercel.app/docs/app-static-rendering) for reference.

## Content

### Pages

If you want to add a page, using [MDX](https://mdxjs.com/) should be sufficient for most use cases. To add a page, we have script for quickly generating pages with the default layout and localized pages which you can run with `pnpm generate:page [title]`.
