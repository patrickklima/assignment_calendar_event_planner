const models = require('./../models');
const sequelize = models.sequelize;

const User = models.User;
var users = {};
users.all = () => {return User.findAll()};
users.byId = (id) => {
  var currentUser = {};
  return User.findById(id)
  .then(userData => {
    currentUser.data = userData;
    return Calendar.findAll({where: {userId: userData.id}});
  })
  .then(calendars => {
    currentUser.calendars = calendars;
    return currentUser;
  });
};
users.create = (data) => {
  // console.log("userData in DataService");
  // console.log(userData);
  return User.create({
    fname: data.fname,
    lname: data.lname,
    username: data.username,
    email: data.email,
  });
};

users.delete = (userId) => {
  return User.destroy({where: {id: userId}, limit: 1});
};
users.update = (userId, data) => {
  return User.update({
    fname: data.fname,
    lname: data.lname,
    email: data.email, 
    username: data.username
  },{
    where: {id: userId}
  });
};

const Calendar = models.Calendar;
var calendars = {};
calendars.all = () => {return Calendar.findAll()};
calendars.byId = (id) => {return Calendar.findById(id)};
calendars.create = (data) => {
  return Calendar.create({
    calendarName: data.name,
    userId: data.userId
  });
};
calendars.update = (id, data) => {
  return Calendar.update({
    calendarName: data.name,
    userId: data.userId
  }, {
    where: {id: id}
  });
};


module.exports = {users, calendars};
