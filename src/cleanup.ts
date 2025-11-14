import {  expect, test } from "@playwright/test";
let baseURL: string = 'http://localhost:3000/users';

export async function cleanUpUsers (request: any): Promise<void> {
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
}

