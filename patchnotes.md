***** TO DO *****


Templates
  - Accounts
  - List

***** CHECK *****
appRoutes.js
  - resolve.groupMembers
    - members.data?

***** CHANGELOG ******
5/22/2014 #####
MainCtrl.js
  - delete tokens on logout & redirect to login

AccountCtrl
  - toggleInput form on edit & on save

HomeCtrl.js
  - refractor registerUser()
  - redirect to /account on /login
  - toggleSignUp()

Routes.js
  - /api/property
    - only search for group when groupID is present
  - /api/groups
    - returns empty array if groupId is not found

AppRoutes.js
  - refractor resolve for /account

AccountService.js
  - add getMembers() to issue get request to /api/group

HOUSE
  - Refractor angular app modules, factories & controllers

Auth Interceptor 
  - Fully functional authorization

AccountService
  - complete get & post requests

ListService
  - complete get & post requests


5/21/2014 ######
Register & Login functionality

/api/properties
  - User.findone user..
  - retrieve groupID
    - var properties = [];
    - retrieve group.members
      - for each user
      - concat user.properties
  - res.send properties

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