import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import uglify from "@lopatnov/rollup-plugin-uglify";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default [
  {
    input: pkg.source,
    output: [
      {
        file: "dist/make-iterable.cjs",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/make-iterable.esm.mjs",
        format: "es",
        sourcemap: true
      },
      {
        file: "dist/make-iterable.umd.js",
        format: "umd",
        name: pkg.umdName,
        sourcemap: true
      }
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist",
        outDir: "./dist"
      })
    ]
  },
  {
    input: pkg.source,
    output: {
      file: "dist/make-iterable.umd.min.js",
      name: pkg.umdName,
      format: "umd",
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: false
      }),
      uglify()
    ]
  }
];
