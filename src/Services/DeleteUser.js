async function DeleteUser(seleccion) {
  fetch(`https://reqres.in/api/users/${seleccion}`, {
    method: 'DELETE',
  })
    .then((resp) => resp.text())
    .then((data) => data);
}
export default DeleteUser;
