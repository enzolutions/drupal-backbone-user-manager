<a href="#/new" class="btn btn-primary">New</a>
<hr />
<table class="table striped">
  <thead>
    <tr>
      <th>Username</th><th>Email</th><th></th>
    </tr>
  </thead>
  <tbody>
    <% _.each(users, function(user) { %>
      <% if (user.id > 0 ) { %>
        <tr>
          <td><%= user.get('name') %></td>
          <td><%= user.get('mail') %></td>
          <td><a class="btn" href="#/edit/<%= user.id %>">Edit</a></td>
        </tr>
      <% } %>
    <% }); %>
  </tbody>
</table>
