async function UpdateProfile(name, lastName, email) {
  const user = {
    first_name: name,
    last_name: lastName,
    email: email,
  };
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  const response = await fetch("https://reqres.in/api/users", {
    method: "PUT",
    headers: headers,
    redirect: "follow",
    mode: "cors",
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("Error:", err));
  return response;
}
export default UpdateProfile;