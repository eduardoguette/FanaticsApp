async function GetUser(id) {
  const response = await fetch(`https://reqres.in/api/users/${id}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error('Error:', err));
  return response;
}
export default GetUser;
