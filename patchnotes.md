***** TO DO *****
appRoutes.js
  - resolve.groupMembers
    - members.data?








Changelog:

Group View
  - grab user prpoerties

Client side views
// list
// account
// logout
  delete web token

Register
  - add name

routes.js
  - require jwt // find npm command

Listing View
  - how to avoid dupes
  - other members of group ability to delete properties

/api/group:
- client issues GET request
- server receives GET request, retrieves _id from req.user
- server queries database, User.findOne(id: id)
  - retrieves groupID from user
  - server queries database, Group.findOne(id: groupId)
  - create variable storage (var members = [])
  - retrieves all members
    - make a copy
    - get rid of password
    - for each member, members.push(user);
  - res.send(members)

- client receives members array
  - render out with ng-repeat each user