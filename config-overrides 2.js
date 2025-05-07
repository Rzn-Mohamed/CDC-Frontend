// config-overrides.js
import webpack from 'webpack';
import path from 'path-browserify';
import crypto from 'crypto-browserify';
import stream from 'stream-browserify';
import buffer from 'buffer';
import os from 'os-browserify/browser';
import process from 'process/browser';

export default function override(config, env) {
  // Add polyfills and fallbacks for node modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": path,
    "os": os,
    "crypto": crypto,
    "stream": stream,
    "buffer": buffer,
    "fs": false,
    "http": false,
    "https": false,
    "zlib": false,
    "net": false,
    "tls": false,
    "child_process": false
  };

  // Add plugins to provide Buffer and process
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Return the modified config
  return config;
};