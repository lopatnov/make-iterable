import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import uglify from "@lopatnov/rollup-plugin-uglify";

import pkg from "./package.json";

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: "umd",
        name: pkg.umdName,
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],

    plugins: [
      json(),
      typescript({
        typescript: require("typescript")
      }),
      resolve(),
      commonjs()
    ]
  },
  {
    input: pkg.source,
    output: {
      file: pkg.main_min,
      name: pkg.umdName,
      format: "umd"
    },
    plugins: [
      json(),
      typescript({
        typescript: require("typescript")
      }),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
