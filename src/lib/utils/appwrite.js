import { Client, Account, Databases, ID, Storage, Avatars } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6594b7ac8742b8d72571');

export const avatars = new Avatars(client);
export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);

export { ID } from 'appwrite';
