export async function getUser() {
  const url = "/api/user/";
  let response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "Application.json" },
  });
  console.log(response);
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

export async function getMatches(username) {
  let url = `/api/matches/${username}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok ? await response.json() : [];
}
