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
var propId = 0;

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
    $('.listOneProperty').css("display", "block");
    $('#propertyFormDiv').css("display", "block");
    $('#activityFormDiv').css("display", "block");
    $('.listOneActivity').css("display", "block");
    $('.listActivities').css("display", "block");
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
  },


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

updateActivity: function (id, data, token, callback) {
   debugger;
   this.ajax({
    method: 'PATCH',
    url: this.ttt + '/activities/' + id, // id is the activity id
    headers: {
      Authorization: 'Token token=' + token
    },
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
    dataType: 'json'
  }, callback);
},

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

  updateProperty: function (id, data, token, callback) {
   debugger;
   this.ajax({
    method: 'PATCH',
    url: this.ttt + '/properties/' + id, // id is the activity id
    headers: {
      Authorization: 'Token token=' + token
    },
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
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

    // dataReturned = $.val(JSON.stringify(data, null, 4))
    $('#result').val(JSON.stringify(data, null, 4));
    dataReturned = data;
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

    /////////
    var formCB = function callback(error, data) {
      debugger;
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' +error.error);
        return;
      }
      $('#result').val(JSON.stringify(data, null, 4));
      // $('form').loadJSON(data);
      // var newHTML = propertyList({properties: data.properties});
      // $('#allProperties').html(newHTML);

      $.each(data, function(i, item) {
        ($('#'+i).val(item));
      });
      //           // oooooorrrrrrrr //
      console.log(data);
      // $.each(data, function(i, item) {
      //   $("#"+item.field).val(item.value);
      // });
    };
    /////////


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

    $('.getact').on('click', function(e) {
      debugger;
      console.log('got to list one activity function', token);
      // var id = $(".listOneActivity input[id=act-id]").val();
      var id = $(".addActivity input[id=actid]").val();
      // var id = 5;
      e.preventDefault();
      tttapi.listOneActivity(id, token, formCB);
    });


    // replaced by getact to get a single activity
    // $('.listOneActivity').on('submit', function(e) {
    // console.log('got to list one activity function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    // e.preventDefault();
    // tttapi.listOneActivity(id, token, callback);
    // });

    $('.updateact').on('click', function(e) {
      // var token = $(this).children('[name="token"]').val();
      debugger;
      var dataForServer = {
        activity : {
          name: $('#name').val(),
          provider: $('#provider').val(),
          prono: $('#prono').val(),
          prostreet: $('#prostreet').val(),
          procity: $('#procity').val(),
          prostate: $('#prostate').val(),
          zip: $('#zip').val(),
          dov: $('#dov').val(),
          tov: $('#tov').val(),
          length: $('#length').val(),
          participant: $('#participant').val()
        }
      };

      var actId = $('#actid').val(); //captuers activity
      // dataForServer.activity.key = $('#act-field').val();
      // dataForServer[dataForServer.activity.key] = $('#act-value').val();

      e.preventDefault();
      tttapi.updateActivity(actId, dataForServer, token, callback);
    });

    $('.addActivity').on('submit', function(e) {

    var dataForServer = {
      activity : {
        "name":$('#name').val(),
        "provider":$("provider").val(),
        "prono":$("prono").val(),
        "prostreet":$("prostreet").val(),
        "procity":$("procity").val(),
        "prostate":$("prostate").val(),
        "zip":$("zip").val(),
        "dov":$("dov").val(),
        "tov":$("tov").val(),
        "length":$("length").val(),
        "participant":$("participant").val(),
        "user_id":userId
   }
    };

    dataForServer.activity["name"] = $(".addActivity input[id=name]").val();
    dataForServer.activity.provider = $(".addActivity input[id=provider]").val();

    dataForServer.activity.prono = $(".addActivity input[id=proNo]").val();
    dataForServer.activity.prostreet = $(".addActivity input[id=prostreet]").val();
    dataForServer.activity.procity = $(".addActivity input[id=procity]").val();
    dataForServer.activity.prostate = $(".addActivity input[id=prostate]").val();
    dataForServer.activity.zip = $(".addActivity input[id=azip]").val();
    dataForServer.activity.dov = $(".addActivity input[id=dov]").val();
    dataForServer.activity.tov = $(".addActivity input[id=tov]").val();
    dataForServer.activity["length"] = $(".addActivity input[id=length]").val();
    dataForServer.activity.participant = $(".addActivity input[id=participant]").val();
    dataForServer.activity.user_id = userId;
    debugger;
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
    tttapi.listOneProperty(id, token, tableCB);
  });

  $('.getprop').on('click', function(e) {
      debugger;
      console.log('got to list one property function', token);
      // var id = $(".listOneActivity input[id=act-id]").val();
      var id = $(".addProperty input[id=propid]").val();
      // var id = 5;
      e.preventDefault();
      tttapi.listOneProperty(id, token, formCB);
    });

  $('.addProperty').on('submit', function(e) {
    var dataForServer = {
      property : {
        "no":$('#no').val(),
        "street":$('#street').val(),
        "city":$('#city').val(),
        "state":$('#state').val(),
        "zip":$('#zip').val(),
        "house_mgmt_co":$('#house_mgmt_co').val(),
        "manager":$('#manager').val(),
        "user_id":0
      }
    };

    $('.updateprop').on('click', function(e) {
      // var token = $(this).children('[name="token"]').val();
      debugger;
      var dataForServer = {
        property : {
          no: $('#name').val(),
          street: $('#provider').val(),
          city: $('#prono').val(),
          state: $('#prostreet').val(),
          zip: $('#procity').val(),
          house_mgmt_co: $('#prostate').val(),
          ['zip']: $('#zip').val()
        }
      };

      var propId = $('#propid').val(); //captuers activity
      // dataForServer.activity.key = $('#act-field').val();
      // dataForServer[dataForServer.activity.key] = $('#act-value').val();

      e.preventDefault();
      tttapi.updateProperty(propId, dataForServer, token, callback);
    });

    // dataForServer.property.no = $(".addProperty input[id=streetNo]").val();
    // dataForServer.property.street = $(".addProperty input[id=street]").val();
    // dataForServer.property.city = $(".addProperty input[id=city]").val();
    // dataForServer.property.state = $(".addProperty input[id=state]").val();
    // dataForServer.property.zip = $(".addProperty input[id=zipcode]").val();
    // dataForServer.property.house_mgmt_co = $(".addProperty input[id=propertyMgmtCo]").val();
    // dataForServer.property.manager = $(".addProperty input[id=manager]").val();
    // dataForServer.property.user_id = userId;

    console.log('got to add property function', dataForServer);
    e.preventDefault();
    tttapi.addProperty(dataForServer, token, callback);
  });

});

});

// });

// async.whilst(
//   gameShouldContinue,
//   playTurn,
//   gameDone);
