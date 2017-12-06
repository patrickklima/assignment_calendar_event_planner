'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var desc = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    var events = [];
    for (var i = 1; i <= 10; i++) {
      events.push({
        eventName: `event{i}`,
        description: desc, 
        startTime: new Date(`2018-${i}-${i+1}`),
        endTime: new Date(`2018-${i}-${i+1}`),
        calendarId: i
      });
    }
    return queryInterface.bulkInsert('Events', events);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    var models = require('./../models');
    return queryInterface.bulkDelete('Events', null, {}, models.Event);
  
  }
};
