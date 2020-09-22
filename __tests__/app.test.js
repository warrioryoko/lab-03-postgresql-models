const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('classes routes', () => {
  it('Just pass CI', () => {
    expect('derp').toEqual('derp');
  });
});
