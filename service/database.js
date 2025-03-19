import { readFile } from "fs/promises";
const config = JSON.parse(
  await readFile(new URL("./dbConfig.json", import.meta.url))
);

import { MongoClient } from "mongodb";
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { maxPoolSize: 100 });

const db = client.db("uno");

const users = db.collection("users"); //users. username & password.
users.createIndex({ username: 1 }, { unique: true });
const lobbies = db.collection("lobbies"); // users awaiting a game
const games = db.collection("games"); //users in an active game, gamestate
const matches = db.collection("matches"); //matches completed games and their users.

(async function testConnection() {
  try {
    await db.command({ ping: 1 }); //ping: 1 literally only tests the connection.
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

//user: username, password, ID, authToken
function addUser(user) {
  users.insertOne({ user });
}

function getUser(username) {
  return users.findOne({ username: username });
}

function getUserAuth(authToken) {
  return users.findOne({ authToken: authToken });
}

function updateUserAuth(user) {
  users.updateOne(
    { username: user.username },
    { $set: { authToken: user.authToken } }
  );
}

function clearUsers() {
  users.deleteMany({});
}

//add end game functionality
function addMatch(match) {
  matches.insertOne({ match });
}

function getMatches() {
  return matches.find().toArray();
}

function clearMatches() {
  matches.deleteMany({});
}

//add updateAuth for every time a user logs in

//start simple with just creating a user
//replace the code that accesses locally stored data in file index.js
//  with code that accesses the database
/*
  if (!findUser("username", req.body.username)) {
    const user = createUser(req.body.username, req.body.password);
    setCookie(res, user.authToken);
    users.push(user);
    res.send(user);
  } else {
    res.status(401).send({ msg: "User already exists" });
  } */
export const database = {
  addUser,
  getUser,
  getUserAuth,
  updateAuth: updateUserAuth,
  getMatches,
};
