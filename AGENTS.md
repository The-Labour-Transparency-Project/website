# Agent instructions

## Project checks

This is a VitePress site. Before handing off any change, run:

```sh
pnpm build
```

Treat TypeScript, Vue, VitePress, accessibility, and editor/static-analysis warnings as failures. Fix the underlying issue instead of suppressing it with `any`, `@ts-ignore`, unused code, or commented-out code. The TypeScript configuration intentionally enables `noUncheckedIndexedAccess` so nullable and out-of-range data access is caught during validation.

## UI and accessibility

- Remove unused props, imports, variables, and dead template markup.
- Keep every ARIA reference valid: an `aria-labelledby` value must point to a rendered element, and interactive elements must have an accessible name.
- Give meaningful images useful `alt` text; use empty alt text only for genuinely decorative images.
- Preserve keyboard access and focus behaviour when changing modals, galleries, or other interactive components.
- In Markdown, invoke globally registered VitePress components with explicit closing tags. If JetBrains cannot resolve a known global component, use a narrowly scoped `<!--suppress HtmlUnknownTag -->` comment immediately above it.

## Documentation

- Use relative Markdown links with the `.md` extension for internal links, for example `../framework.md` or `../articles/01-product-traceability-and-workforce-traceability.md`. VitePress converts these to clean URLs at build time, while the IDE can resolve the source files.
- Check that every internal link targets an existing page.
- Keep the initiative, framework, implementation, Code, and library pages cross-linked to relevant summary papers when adding or changing project concepts.
