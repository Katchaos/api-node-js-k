// tests/api.spec.ts
import { test, expect } from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {
    test.beforeEach(async ({ request }) => {
        const responseAllUsers = await request.get(`${baseURL}`);
        expect(responseAllUsers.status()).toBe(200);
        const responseUsers = await responseAllUsers.json();
        const numberOfObjects = responseUsers.length;
        console.log('number of objects' + numberOfObjects);
        let userIds: number[] = [];
    for (let i = 0; i < numberOfObjects; i++) {
        let userId = responseUsers[i].id;
        userIds.push(userId);
    }
    for (let i = 0; i < numberOfObjects; i++) {
        let response = await request.delete(`${baseURL}/${userIds[i]}`);
        expect.soft(response.status()).toBe(200);
        }
        const response = await request.get(`${baseURL}`);
        expect.soft(response.status()).toBe(200);
        const responseBody = await response.text();
            expect.soft(responseBody).toBe('[]');
    });

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
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json();
        const userId = responseBody.id;
        await request.delete(`${baseURL}`+ '/' + userId);
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
        await request.delete(`${baseURL}`+ '/' + userId);
        const deletedUser = await request.get(`${baseURL}`+ '/' + userId);
        expect(deletedUser.status()).toBe(404);
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json();
        const userId = responseBody.id;
        await request.delete(`${baseURL}`+ '/' + userId);
        const getResponse = await request.get(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(404);
    });

    test('get user id info', async ({ request }) => {
        const response1 = await request.post(`${baseURL}`);
        const response2 = await request.post(`${baseURL}`);
        const responseAllUsers = await request.get(`${baseURL}`);
        const responseUsers = await responseAllUsers.json();
        const numberOfObjects = responseUsers.length;
        console.log('number of objects', numberOfObjects);

        let userIds: number[] = [];

        for (let i = 0; i < numberOfObjects; i++) {
            let UserId = responseUsers[i].id;
            userIds.push(UserId);
        }
        console.log(userIds);
        //new code
        for (let i = 0; i < numberOfObjects; i++) {
            // delete user by id
            let response = await request.delete(`${baseURL}/${userIds[i]}`);
            // validate the response status code
            expect.soft(response.status()).toBe(200);
        }
    });
});
