const Roles = [{
  username: 'alice',
  password: 'alice',
  role: 'Operator'
}, {
  username: 'bert',
  password: 'bert',
  role: 'Specialist'
}]

function validate(form) {
  event.preventDefault()
  const username = ($('#username').val())
  const password = ($('#password').val())
  const user = Roles.filter((role) => {
    if (role.username === username.toLowerCase().trim() && role.password === password) {
      console.log('Matched')
      return true
    }
  })
  if (!user.length) {
    $('#error').empty()
    $('#error').append('Wrong Details')
  }
  else {
    if (user[0].role === 'Operator')
      window.location.href = '/helpdesk/phase-1-without-frameworks/dashboard.html'
    if (user[0].role === 'Specialist')
      window.location.href = '/helpdesk/phase-1-without-frameworks/specialist-dashboard.html'
  }

}