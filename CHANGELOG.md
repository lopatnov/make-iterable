# Changelog

## [3.0.0] - 2026-02-18

### Breaking Changes

- **Dist filenames changed**: output files are now `.cjs`, `.esm.mjs`, `.umd.js`, and `.umd.min.js` (previously `.js`, `.es.js`, `.min.js`)
- **Node.js requirement raised**: `>=20.6.0` (previously `>=10.x`)
- **`main_min` field removed** from `package.json`

### Added

- `exports` field in `package.json` for proper ESM/CJS resolution
- `browser` field pointing to the UMD build
- Minified UMD output: `dist/make-iterable.umd.min.js`
- Source maps for all non-minified builds
- `engines` field enforcing Node.js `>=20.6.0`
- Guard against calling `makeIterable` twice on the same object (previously threw `TypeError`)

### Changed

- TypeScript upgraded to 5.x with strict mode enabled
- Rollup upgraded to 4.x
- Test runner switched from Jest to Node.js native test runner (`node:test`)
- Linter switched from ESLint to Oxlint
- Formatter switched from Prettier to Oxfmt
- CI updated: Node.js matrix `[20.x, 22.x, 24.x]`, lint and format-check steps added
- `iterableNames` filter uses `Set` instead of `Array.indexOf` for better performance
- JSDoc for `makeIterable` now documents `@throws`

### Removed

- `.travis.yml` (replaced by GitHub Actions)
- `.jshintrc` (replaced by Oxlint)
- Jest, ts-jest, and related configuration
- ESLint, Prettier, and related configuration files

## [2.0.0] - 2021-09-19

Initial release with TypeScript 4.x, Rollup 2, and Jest.
