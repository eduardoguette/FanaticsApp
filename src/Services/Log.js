async function entrar(email, pass) {
  const user = {
    email: email,
    password: pass,
  };
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("Error:", err));
  return response;
}
export default entrar;