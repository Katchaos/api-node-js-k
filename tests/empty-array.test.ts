import {expect, test} from "@playwright/test";
let baseURL: string = 'http://localhost:3000/users';

test('all users: should return empty array when no users', async ({ request }) => {
    const response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.text()
    expect(responseBody).toBe('[]');
});
