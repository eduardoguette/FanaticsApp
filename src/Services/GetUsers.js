async function GetUsers(pagina = 1) {
  const apiUrl = `https://reqres.in/api/users/?page=${pagina}`;
  return await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const users = data.data;
      return users;
    })
    .catch((error) => console.log(error));
}

export default GetUsers;
