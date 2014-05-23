***** TO DO *****
Home.html
  - Add confirm password

Create Group
  - /api/property
    - currently errors when user does not have any properties

Parse Craigslist
  - http request
  - add $scope.listingUrl navbar to listview



***** CHANGELOG ******
5/23/2014 ######
Http-request Node
  - add node module to scrape listings
  - scrapes listings

Parser(CraigsList)
  - map coordinates

fetchListing()
  - added to ListCtrl, ListService, routes.js



5/22/2014 ######
MainCtrl
  - transferred navbar to List & Account
  - delete MainCtrl

Home.html
  - change basic signup form with validation

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
    - fix property GET requests
  - /api/groups
    - returns empty array if groupId is not found
  - Refractor updateUser
    - set groupID: String in schema

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
  - add getMembers()

ListService
  - complete get & post requests
  - add createNewGroup()


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