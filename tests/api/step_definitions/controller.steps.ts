import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request, { Response } from 'supertest';

import { getTestServer } from '../testServer';
import { getContainer } from '../../../src/api/shared/dependency-injection/container';
import { Server } from '../../../src/api/server';
import { EnvironmentArranger } from '../../modules/shared/infrastructure/arranger/environmentArranger';

let _request: request.Test;
let testServer: Server;
let _response: Response;
const headers: Record<string, string> = {};
const variables: Record<string, string> = {};

Given('I send a GET request to {string}', (route: string) => {
  _request = request(testServer.app).get(route).set(headers);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(testServer.app)
    .put(route)
    .set(headers)
    .send(JSON.parse(body));
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = request(testServer.app)
    .post(route)
    .set(headers)
    .send(JSON.parse(body));
});

Given('I send a DELETE request to {string}', function (route: string) {
  _request = request(testServer.app)
    .delete(route)
    .set(headers);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response should contain:', (body: string) => {
  const expectedBody = JSON.parse(body);
  const actualBody = _response.body;
  
  Object.keys(expectedBody).forEach(key => {
    assert.strictEqual(actualBody[key], expectedBody[key], `Expected ${key} to be ${expectedBody[key]} but got ${actualBody[key]}`);
  });
});

Then('the response should contain field {string}', (key: string) => {
  assert.ok(_response.body && Object.prototype.hasOwnProperty.call(_response.body, key), `Expected response to contain field ${key}`);
});

Then('the response should be an empty array', () => {
  assert.ok(Array.isArray(_response.body), 'Expected response body to be an array');
  assert.strictEqual(_response.body.length, 0, 'Expected array length to be 0');
});

Then('the response should be an array with length {int}', (length: number) => {
  assert.ok(Array.isArray(_response.body), 'Expected response body to be an array');
  assert.strictEqual(_response.body.length, length, `Expected array length to be ${length} but got ${_response.body.length}`);
});

Then('the response should contain an item with:', (body: string) => {
  const expected = JSON.parse(body);
  const actual = _response.body;
  assert.ok(Array.isArray(actual), 'Expected response body to be an array');
  const found = actual.some((item: any) => {
    return Object.keys(expected).every(key => item[key] === expected[key]);
  });
  assert.ok(found, 'Expected array to contain an item matching the provided fields');
});

Then('I store field {string} as variable {string}', (field: string, varName: string) => {
  const value = _response.body?.[field];
  assert.ok(value !== undefined, `Expected field ${field} to exist in response`);
  variables[varName] = value;
});

Given('I set header {string} with value {string}', (key: string, value: string) => {
  headers[key] = value;
});

Given('I set header {string} with value from variable {string}', (key: string, varName: string) => {
  const value = variables[varName];
  assert.ok(value !== undefined, `Variable ${varName} is not set`);
  headers[key] = value;
});

Given('I set bearer token from variable {string}', (varName: string) => {
  const value = variables[varName];
  assert.ok(value !== undefined, `Variable ${varName} is not set`);
  headers['Authorization'] = `Bearer ${value}`;
});

BeforeAll(async () => {
  testServer = await getTestServer();

  const container = getContainer();
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'Shared.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();

  await testServer.start();
});

AfterAll(async () => {
  testServer = await getTestServer();

  const container = getContainer();
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'Shared.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();

  testServer.close();
});
