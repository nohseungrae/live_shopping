import invariantPlugin from "rollup-plugin-invariant";
import { terser as minify } from "rollup-plugin-terser";

export default [{
  input: "src/index.tsx",
  output: {
    file: "lib/bundle.js",
    format: "cjs"
  },
  plugins: [
    invariantPlugin({
      errorCodes: true,
    }),
  ],
}, {
  input: "lib/bundle.js",
  output: {
    file: "lib/bundle.min.js",
    format: "cjs"
  },
  plugins: [
    minify({
      compress: {
        global_defs: {
          "@process.env.NODE_ENV": JSON.stringify("production"),
        },
      },
    }),
  ],
}];