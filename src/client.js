export async function getUser() {
  const url = "/api/user/";
  let response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "Application.json" },
  });
  console.log(response);
  return await response.json();
}
//post("/game/:gameCode/start",
export async function startGame(gameCode) {
  await fetch(`/api/game/${gameCode}/start`, {
    method: "POST",
  });
}
export async function getGameState(gameCode) {
  let response = await fetch(`/api/game/${gameCode}/state`);
  return await response.json();
}

export async function playCard(gameCode, card) {
  let turn = { action: "playCard", gameCode, card };
  return await takeTurn(turn);
}

export async function drawCard(gameCode) {
  let turn = { action: "drawCard", gameCode };
  return await takeTurn(turn);
}

export async function takeTurn(turn) {
  let response = await fetch(`/api/game/${turn.gameCode}/take-turn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turn),
  });
  return await response.json();
}

export async function joinGame(gameCode) {
  const url = "/api/game";
  let response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameCode: gameCode }),
  });
  return response.ok;
}

export async function createLobby(gameCode) {
  let url = `/api/lobby/${gameCode}`;
  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "Application.json" },
  });
}

export async function deleteLobby(gameCode) {
  let response = await fetch(`/api/lobby/${gameCode}`, {
    method: "DELETE",
  });
}

export async function getLobbies() {
  let url = "/api/lobby";
  let response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "Application.json" },
  });
  return response;
}

export async function getLobby(gameCode) {
  if (!gameCode || gameCode === undefined) {
    alert("Missing game Code");
    location = "/join";
  }
  let response = await fetch(`/api/lobby/${gameCode}`);
  return await response.json();
}

export async function loginUser() {
  let url = "/api/user/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  let url = "/api/user/logout";
  try {
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ username: "username", password: "password" }),
    });
  } catch (error) {}
  localStorage.removeItem("username");
}

export async function getQuote() {
  let url = "/api/quote";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function getMatches() {
  let url = "/api/matches";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok ? await response.json() : [];
}
