const path = require("node:path");
const merge = require("webpack-merge");
const webpack = require("webpack");


const config = merge.smart(require("./webapck.base"), {
  mode: "production",

});