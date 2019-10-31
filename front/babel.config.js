module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    "styled-components",
    "react-hot-loader/babel",
    "transform-es2015-modules-commonjs"
  ]
};
