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
var gameId = 0;
var dataReturned ={};

var tttapi = {
  gameWatcher: null,
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
  },

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
    dataReturned = $('#result').val(JSON.stringify(data, null, 4));
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

  $('.listProperties').on('submit', function(e) {
    console.log('got to list properties function', token);
//    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listProperties(token, callback);
  });

  $('.addProperty').on('submit', function(e) {
    debugger;

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
      // }
   }
  };

    dataForServer.property.no = $(".addProperty input[id=streetNo]").val();
    dataForServer.property.street = $(".addProperty input[id=street]").val();
    dataForServer.property.city = $(".addProperty input[id=city]").val();
    dataForServer.property.state = $(".addProperty input[id=state]").val();
    dataForServer.property.zip = $(".addProperty input[id=zipcode]").val();
    dataForServer.property.house_mgmt_co = $(".addProperty input[id=propertyMgmtCo]").val();
    dataForServer.property.manager = $(".addProperty input[id=manager]").val();
    dataForServer.property.user_id = 3;

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
