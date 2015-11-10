"use strict";

// Global variable definitions

// var registerURL = 'http://ttt.wdibos.com/users';
var registerURL = 'http://localhost:3000/register';
// var loginURL = 'http://ttt.wdibos.com/login';
var loginURL = 'http://localhost:3000/login';
// var booksURL = 'http://ttt.wdibos.com/books';
var booksURL = 'http://localhost:3000/books';  // will be used for create & list books
// var showAllGamesURL = 'http://ttt.wdibos.com/games';
var userEmail = "";
var token = "";
var userId = 0;
var gameId = 0;

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
    debugger;
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
    $('.listBooks').css("display", "block");
  },

listBooks: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/books',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  addBook: function (token, callback) {
    debugger;
    this.ajax({
      method: 'POST',
      url: this.ttt + '/books',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/'+id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },


  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
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
    console.log(data);
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
    $('#result').val(JSON.stringify(data, null, 4));
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
      }
      token = data.user.token;
      callback(null, data);
      console.log(token);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('.listBooks').on('submit', function(e) {
    console.log('got to list books function', token);
    debugger;
//    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listBooks(token, callback);
  });

  $('.add-book').on('submit', function(e) {
    debugger;
    console.log('got to add book function', token);
//    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.addBook(token, callback);
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
