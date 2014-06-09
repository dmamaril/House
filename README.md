# HOUSE: apartment hunting made easy
Produced at <a href='http://hackreactor.com'>Hack Reactor </a> by <a href='http://github.com/willwclo'>Will Lo</a>, <a href='http://github.com/vhalbwachs'>Vin Halbwachs</a> & <a href='http://github.com/mamarildon'>Don Mamaril </a>


<img src='http://i.imgur.com/bOkXodv.png'>

Let's face it-- apartment hunting sucks. Low budgets and long commutes sound familiar? Unfortunately, for $800/month, big cities like San Francisco will either give you a room the size of walk-in closet or one where you'll have to share with someone you'd really rather not share a room with. Even when you find a room you want and can afford, chances are that it will come down to lottery. 

This is where House comes in.

<a href='https://github.com/mamarildon/House.git'>House</a> introduces you to others searching for housing that have been accepted to your school. This helps you get from "decent" roommates to ones who won't host a giant party the night before you've got a big project due. You'll be surrounded with peers that are pursuing the same goals, which means less distraction and more motivation. 

Our platform is about coordination. Consolidate all communication on site and simplify the apartment-hunting experience.

<img src='http://i.imgur.com/3B8Xkph.jpg'/>

Set up your preferences. Check out possible roommates' portfolios. Get your group together. Split the work! Find listings from craigslist or airbnb and share them with the group.

<img src='http://i.imgur.com/aA1KPpX.jpg'/>

View the general neighborhood of the listing along with the distance from your daily commute [school or work], right next to your monthly rent.

*That's* how you make apartment hunting easy.

## Tech Stack
![Alt text](/public/assets/stack.jpg?raw=true)
+ Passport & OAuth
+ Google Maps
+ Karma / Jasmine Test Suite

## Challenges
* Custom CraigsList & AirBnB parsers
* Transition from local login/authentication to OAuth 2.0 with Google passport strategy
* Team workflow with git and handling merge conflicts
* First experience working with agile methodologies
* Developing backend and frontend in parallel (accomodating changes in routing)

## Diving In
```
$ git clone https://github.com/mamarildon/House.git
$ cd House
$ npm install
$ bower install
$ node server.js
```
