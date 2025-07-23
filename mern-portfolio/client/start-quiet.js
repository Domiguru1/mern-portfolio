#!/usr/bin/env node

// Suppress warnings before starting
process.env.NODE_NO_WARNINGS = '1';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

// Filter out specific deprecation warnings
const originalEmit = process.emit;
process.emit = function (name, data, ...args) {
  if (
    name === 'warning' && 
    typeof data === 'object' && 
    data.name === 'DeprecationWarning' &&
    (
      data.message.includes('onAfterSetupMiddleware') ||
      data.message.includes('onBeforeSetupMiddleware') ||
      data.message.includes('util._extend')
    )
  ) {
    return false;
  }
  return originalEmit.apply(process, [name, data, ...args]);
};

// Start react-scripts
require('react-scripts/scripts/start');