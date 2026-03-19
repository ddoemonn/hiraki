# hiraki

Monorepo for hiraki, a zero-dependency React drawer component library.

## Structure

```
packages/
  hiraki/          # the library (published to npm as "hiraki")
apps/
  website/         # marketing and documentation site (Next.js)
```

## Development

Requires Node 18+ and pnpm.

```sh
pnpm install
pnpm turbo dev
```

Run only the website:

```sh
pnpm turbo dev --filter=website
```

Build everything:

```sh
pnpm turbo build
```

Run tests:

```sh
pnpm turbo test
```

## Library

The library lives at `packages/hiraki`. It has no runtime dependencies — React >=18 is the only peer dep. Built with tsup to ESM and CJS, with TypeScript declarations.

See [packages/hiraki/README.md](packages/hiraki/README.md) for usage documentation.

## Website

The documentation and marketing site lives at `apps/website`. Built with Next.js, Tailwind v4, and hiraki itself for all drawer demos. No other UI library.

## Contributing

Open an issue before starting work on a large change. For small fixes, a PR is fine directly.

Tests live in `packages/hiraki/src/__tests__`. Run `pnpm turbo test` before pushing.

## License

MIT
