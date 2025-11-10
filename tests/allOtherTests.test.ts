// tests/api.spec.ts
import { test, expect } from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

    test('find user: should return a user by ID', async ({ request }) => {
        //create a user
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json();
        const userId = responseBody.id;
        //find user by id
        const getResponse = await request.get(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(200);
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const userId = 9999999;
        const getResponse = await request.get(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(404);

    });

    test('create user: should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.name).toBeDefined();
        console.log(responseBody);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json();
        const userId = responseBody.id;
        const responseDelete = await request.delete(`${baseURL}`+ '/' + userId);
        expect(responseDelete.status()).toBe(200);
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json();
        const userId = responseBody.id;
        const getResponse = await request.get(baseURL + '/' + userId);
        const responseDelete = await request.delete(`${baseURL}`);
        expect(responseDelete.status()).toBe(404);

    });
});
