import { readFile } from "fs/promises";
const config = JSON.parse(
  await readFile(new URL("./dbConfig.json", import.meta.url))
);
//mongodb+srv://megatron:<db_password>@cybertron.oh3gy.mongodb.net/

import { MongoClient } from "mongodb";
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}/`;
const client = new MongoClient(url, { maxPoolSize: 100 });

const db = client.db("uno");

const users = db.collection("users"); //username, password, authKey
users.createIndex({ password: 1 });
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

async function addUser(user) {
  await users.insertOne({
    username: user.username,
    password: user.password,
    authToken: user.authToken,
  });
}

async function getUser(username) {
  return await users.findOne({ username: username });
}

async function getUserAuth(authToken) {
  return await users.findOne({ authToken: authToken }, { _id: 0 });
}

async function updateUserAuth(user) {
  await users.updateOne(
    { username: user.username },
    { $set: { authToken: user.authToken } }
  );
}

async function clearUsers() {
  await users.deleteMany({});
}

//add end game functionality
async function addMatch(match) {
  await matches.insertOne({ match });
}

async function getMatches() {
  return await matches.find().toArray();
}

async function clearMatches() {
  await matches.deleteMany({});
}

async function addLobby(lobby) {
  await lobbies.insertOne(lobby);
}

async function leaveLobby(lobbyCode, username) {
  await lobbies.updateOne(
    { gameCode: lobbyCode },
    { $pull: { players: username } }
  );
  await lobbies.deleteOne({ gameCode: lobbyCode, host: username });
}

async function joinLobby(gameCode, username) {
  await lobbies.updateOne(
    { gameCode: gameCode },
    { $push: { players: username } }
  );
}
async function getLobby(gameCode) {
  return await lobbies.findOne({ gameCode: gameCode });
}

async function removeLobby(gameCode) {
  await lobbies.deleteOne({ gameCode: gameCode });
}

async function getLobbies() {
  return await lobbies.find().toArray();
}

async function addGame(game) {
  if (await games.findOne({ gameCode: game.state.gameCode })) {
    return;
  }
  await games.insertOne({
    gameCode: game.state.gameCode,
    state: game.state,
  });
}

async function getGame(gameCode) {
  return await games.findOne({ gameCode: gameCode });
}

async function updateGame(gameCode, state) {
  return await games.updateOne(
    { gameCode: gameCode },
    { $set: { state: state } }
  );
}

export const database = {
  addUser,
  getUser,
  getUserAuth,
  updateUserAuth,
  getMatches,
  addLobby,
  joinLobby,
  leaveLobby,
  getLobby,
  getLobbies,
  addGame,
  getGame,
  updateGame,
  removeLobby,
};
