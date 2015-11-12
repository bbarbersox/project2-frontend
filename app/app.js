"use strict";

// Global variable definitions

// var registerURL = 'http://ttt.wdibos.com/users';
var registerURL = 'http://localhost:3000/register';
// var loginURL = 'http://ttt.wdibos.com/login';
var loginURL = 'http://localhost:3000/login';
// var booksURL = 'http://ttt.wdibos.com/books';
var booksURL = 'http://localhost:3000/books';  // will be used for create & list books
// var showAllGamesURL = 'http://ttt.wdibos.com/games';
var propertiesURL = 'http://localhost:3000/properties';  // will be used for create & list properties
// var showAllGamesURL = 'http://ttt.wdibos.com/games';

var userEmail = "";
var token = "";
var userId = 0;
var listFlag = "";
var dataReturned ={};

var tttapi = {
  ttt: 'http://localhost:3000',
//   ttt: 'http://ttt.wdibos.com',

ajax: function(config, cb) {
  console.log('got to ajax done routine');
  console.log(config);
  $.ajax(config).done(function(data, textStatus, jqxhr) {
    cb(null, data);
  }).fail(function(jqxhr, status, error) {
    cb({jqxher: jqxhr, status: status, error: error});
  });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
    $('#registerDiv').css("display", "none");
    $('#loginDiv').css("display", "block");
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
    $('#loginDiv').css("display", "none");
    $('#propertiesDiv').css("display", "block");
    $('.listProperties').css("display", "block");
    $('#propertyFormDiv').css("display", "block");
    $('#activityFormDiv').css("display", "block");
  },

listActivities: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/activities',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
    // console.log(dataReturned);
    // dataReturned = $.parseJSON(dataReturned);
    // console.log(dataReturned);
    // add code here to parse the JSON, map it to an
    //array and append it to a table/list
  },

// showActivitesResult: function( resultData ) {
//   console.log('got to activity result processing', resultData);
//   if (listFlag = "activity") {
//     //resultData.forEach(function(entry) {
//     console.log(entry);
//     // $.each(resultData, function(i, item) {
//     // $('<tr>').html(
//     //     "<td>" + resultData[i].rank + "</td><td>" + resultData[i].content + "</td><td>" + resultData[i].UID + "</td>").appendTo('.activtyTable');
//   };
// },

listOneActivity: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/activities/'+id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

// updateActivity: function (id, data, token, callback) {
//   this.ajax({
//     method: 'PATCH',
//     url: this.ttt + '/activities/' + id, // id is the activity id
//     headers: {
//       Authorization: 'Token token=' + token
//     },
//     contentType: 'application/json; charset=utf-8',
//     data: JSON.stringify(data),
//     dataType: 'json'
//   }, callback);
// },

  addActivity: function (formdata, token, callback) {
    console.log(formdata);
    this.ajax({
      method: 'POST',
      url: this.ttt + '/activities',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType : 'application/json',
      data: JSON.stringify(formdata),
      dataType: 'json'
    }, callback);
  },


  // deleteActivity: function (formdata, token, callback) {
  //   console.log(formdata);
  //   this.ajax({
  //   url: this.ttt + '/activities/'+id,
  //   type: 'DELETE',
  //   success: function(result) {
  //       // Do something with the result
  //   }
  // });

  listProperties: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/properties',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  listOneProperty: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/properties/'+id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  addProperty: function (formdata, token, callback) {
    debugger;
    console.log('got to add property function');
    console.log(formdata);
    this.ajax({
      method: 'POST',
      url: this.ttt + '/properties',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType : 'application/json',
      data: JSON.stringify(formdata),
      dataType: 'json'
    }, callback);
  },

};

$(document).ready(function() {
  $(function() {
    var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
    };

    var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
    };

    var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    debugger;

    // dataReturned = $.val(JSON.stringify(data, null, 4))
    $('#result').val(JSON.stringify(data, null, 4));
    dataReturned = data;
    console.log(data);
    console.log(dataReturned);
    // tttapi.showActivitesResult(dataReturned);
    };


    var propertyList = Handlebars.compile($('#properties-list').html());

    var tableCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    var newHTML = propertyList({properties: data.properties});
    $('#allProperties').html(newHTML);
  };





    // If user has not registered this register checkbox will be clicked
    $('.checkbox').on('click', function(e){
    $('#registerDiv').css("display", "block");
    $('#loginDiv').css("display", "none");
    });  // end of register checkbox processing

    // Register button processing
    $('.register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
    });  // end of register button processing

    $('.login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      };
      callback(null, data);
      token = data.user.token;
      userId = data.user.id;
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
    });

    $('.listActivities').on('submit', function(e) {
    e.preventDefault();
    listFlag = "activity";
    tttapi.listActivities(token, callback);
    });

    $('.listOneActivity').on('submit', function(e) {
    console.log('got to list one activity function', token);
    var id = $(".listOneActivity input[id=act-id]").val();
    e.preventDefault();
    tttapi.listOneActivity(id, token, callback);
    });

    // $('.updateActivity').on('submit', function(e) {
    //   var token = $(this).children('[name="token"]').val();
    //   var id = $('#mark-id').val();
    //   var data = wrap('game', wrap('cell', form2object(this)));
    //   e.preventDefault();
    //   tttapi.markCell(id, data, token, callback);
    // });

    $('.addActivity').on('submit', function(e) {
    debugger;

    var dataForServer = {
      activity : {
        "actname":"",
        "provider":"",
        "prono":"",
        "prostreet":"",
        "procity":"",
        "prostate":"",
        "zip":"",
        "dov":"",
        "tov":"",
        "actlength":0,
        "participant":"",
        "user_id":userId
   }
    };

    dataForServer.activity.actname = $(".addActivity input[id=actname]").val();
    dataForServer.activity.provider = $(".addActivity input[id=serviceprovider]").val();

    dataForServer.activity.prono = $(".addActivity input[id=astreetNo]").val();
    dataForServer.activity.prostreet = $(".addActivity input[id=astreet]").val();
    dataForServer.activity.procity = $(".addActivity input[id=acity]").val();
    dataForServer.activity.prostate = $(".addActivity input[id=astate]").val();
    dataForServer.activity.zip = $(".addActivity input[id=azipcode]").val();
    dataForServer.activity.dov = $(".addActivity input[id=dateofactivity]").val();
    dataForServer.activity.tov = $(".addActivity input[id=timeofactivity]").val();
    dataForServer.activity.actlength = $(".addActivity input[id=length]").val();
    dataForServer.activity.participant = $(".addActivity input[id=participants]").val();
    dataForServer.activity.user_id = userId;

    console.log('got to add activity function', dataForServer);
    e.preventDefault();
    tttapi.addActivity(dataForServer, token, callback);
  });

    $('deleteActivity').on('Submit', function(e){
      console.log('got to delete Acivity');

    });

  $('.listProperties').on('submit', function(e) {
    console.log('got to list properties function', token);
    e.preventDefault();
    tttapi.listProperties(token, tableCB);
  });

  $('.listOneProperty').on('submit', function(e) {
    console.log('got to list one property function', token);
    var id = $(".listOneProperty input[id=prop-id]").val();
    e.preventDefault();
    tttapi.listOneProperty(id, token, callback);
  });

  $('.addProperty').on('submit', function(e) {
    var dataForServer = {
      property : {
        "no":"",
        "street":"",
        "city":"",
        "state":"",
        "zip":"",
        "house_mgmt_co":"",
        "manager":"",
        "user_id":0
      }
    };

    dataForServer.property.no = $(".addProperty input[id=streetNo]").val();
    dataForServer.property.street = $(".addProperty input[id=street]").val();
    dataForServer.property.city = $(".addProperty input[id=city]").val();
    dataForServer.property.state = $(".addProperty input[id=state]").val();
    dataForServer.property.zip = $(".addProperty input[id=zipcode]").val();
    dataForServer.property.house_mgmt_co = $(".addProperty input[id=propertyMgmtCo]").val();
    dataForServer.property.manager = $(".addProperty input[id=manager]").val();
    dataForServer.property.user_id = userId;

    console.log('got to add property function', dataForServer);
    e.preventDefault();
    tttapi.addProperty(dataForServer, token, callback);
  });


  var createGameCB = function createGameCB(err, data) {
    console.log(data);
    if (err) {
      console.error(err);
      return;
    } else {
      gameId = data.game.id;
    }
  };

  $('#create-game').on('submit', function(e) {
    //var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, createGameCB);
  });

  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, token, callback);
  });
});

});

// });

// async.whilst(
//   gameShouldContinue,
//   playTurn,
//   gameDone);
