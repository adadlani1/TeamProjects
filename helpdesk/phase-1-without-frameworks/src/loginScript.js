const Roles = [{
  username: 'alice',
  password: 'alice',
  role: 'Operator'
}, {
  username: 'bert',
  password: 'bert',
  role: 'Specialist'
}];

function validate(form) {
  event.preventDefault();
  const username = ($('#username').val());
  const password = ($('#password').val());
  console.log(username + password);
  const user = Roles.filter((role) => {
    if (role.username === username.toLowerCase().trim() && role.password === password) {
      console.log('Matched');
      return true
    }
  });
  if (!user.length) {
    setTimeout($('#error').css('display', 'block'), 200) }
  else {
    if (user[0].role === 'Operator')
      window.location.href = 'dashboard.html';
    if (user[0].role === 'Specialist')
      window.location.href = 'Specialist_Dashboard.html'
  }

}
$(document).ready(function () {
  $('#error').css('display', 'none');
});
