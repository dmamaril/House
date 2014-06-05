// Should this be in `test/e2e/apiSpec.js`?

describe('API', function () {
var cache={};

    it("should create a user", function () {  
        $.ajax({
            url: "http://localhost:8000/api/getTestUser"
        }).done(function (data) {
            cache.testUser = data;
            expect(cache.testUser._id).toBeDefined();
        })
        waits(1000);

    });

    it("should retrieve the same user it created", function () {
        var retrievedUser;
        $.ajax({
            url: "http://localhost:8000/api/user/" + cache.testUser._id
        }).done(function (data) {
            retrievedUser = data;
            expect(cache.testUser._id).toEqual(retrievedUser._id);
        })

        waits(1000); 
    });

    it("should create a group", function () {
        $.ajax({
            method: 'POST',
            url: "http://localhost:8000/api/group/",
            data: {name: 'testGroup', 'userId': cache.testUser._id}
        }).done(function (data) {
            cache.group = data;
            expect(cache.group.name).toEqual('testGroup');
        });
        waits(1000); 
    });

    it("should assign the user to the newly created group", function () {
        $.ajax({
            method: 'GET',
            url: "http://localhost:8000/api/user/" + cache.testUser._id
        }).done(function (data) {
            expect(data.groups[0]._id).toEqual(cache.group._id);
        });
        waits(1000); 
    });

    it("should take a listing and add it to a group", function () {
        $.ajax({
            method: 'POST',
            url: "http://localhost:8000/api/listings/",
            data: {url: "http://sfbay.craigslist.org/eby/sub/4504854556.html", groupId: cache.group._id}
        }).done(function (data) {
            expect(data.group).toEqual(cache.group._id);
        });
        waits(1500); 
    });

    it("should fetch listings from a group", function () {
        $.ajax({
            url: "http://localhost:8000/api/group/"+cache.group._id+"/listings"
        }).done(function (data) {
            // console.log('listings', data);
            expect(data[0].group._id).toEqual(cache.group._id);
        });
        waits(1500); 
    });

    it("should add a user to a group - get new user", function () {
        $.ajax({
            url: "http://localhost:8000/api/getTestUser"
        }).done(function (data) { 
            cache.user2 = data;
        });
        waits(1500); 
    });

    it("should add a user to a group - put user in group", function () {
        console.log(cache.group._id, cache.user2._id);
        $.ajax({
            method: 'PUT',
            url: "http://localhost:8000/api/group/"+cache.group._id+"/users/"+cache.user2._id,
        }).done(function(data) {
            cache.user2afterGroupAdd = data;
        });
        waits(1500);
    });

    it("should add a user to a group - get users", function () {
        $.ajax({
            url: "http://localhost:8000/api/user/" + cache.user2._id
        }).done(function (data) {
            expect(cache.user2afterGroupAdd.groups[0]).toEqual(cache.group._id);
        })
        waits(1500);
    });

    it("should get a list of users in a group", function () {
        $.ajax({
            url: "http://localhost:8000/api/group/" + cache.group._id + "/users"
        }).done(function (data) {
            console.log(data);
            expect(data.length).toEqual(2);
        })
        waits(1000);
    });

    it("should delete a user from a group", function () {
        $.ajax({
            method: 'DELETE',
            url: "http://localhost:8000/api/group/"+ cache.group._id + "/users/" + cache.user2._id
        }).done(function (data) {
            console.log('deleted', data);
            cache.user2afterGroupRemove = data
            expect(data.groups.length).toEqual(0);
        })
        waits(1000);
    });
});