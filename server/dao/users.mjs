import { readFile } from "fs/promises";

export default async function getUser(username) {
  const data = await readFile('./data/users.json');
  const users = JSON.parse(data);
  const user = users.find(user => user.username === username);
  if (user) {
    return user;
  }
  else {
    throw new Error(`User not found`);
  }
}