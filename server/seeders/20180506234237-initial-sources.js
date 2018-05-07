module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('Sources',[{
      name:'Github',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:'Waka',
      createdAt:new Date(),
      updatedAt:new Date()
    }],{}),

  down: (queryInterface, Sequelize) => {
  }
};
