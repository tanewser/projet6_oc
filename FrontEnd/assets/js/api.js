//Appel des apis

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();
  return data;
}

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  return data;
}

async function loginUser(loginInfo) {
  const res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: loginInfo,
    headers: { "Content-Type": "application/json", accept: "*/*" },
  });

  if (res.ok) {
    const user = await res.json();
    return user.token;
  } else {
    return false;
  }
}
