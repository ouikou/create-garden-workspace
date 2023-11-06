'use strict';

const createGardenWorkspace = require('..');
const assert = require('assert').strict;

assert.strictEqual(createGardenWorkspace(), 'Hello from createGardenWorkspace');
console.info('createGardenWorkspace tests passed');
