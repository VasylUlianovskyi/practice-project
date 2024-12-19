module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('Users', 'birthday', {
        type: Sequelize.DATEONLY,
        // CHECK, PK, UNIQUE, NOT NULL, FK, DEFAULT
      })
      .then(() => {
        queryInterface.addConstraint('Users', {
          fields: ['birthday'],
          type: 'check',
          where: {
            birthday: {
              [Sequelize.Op.lte]: Sequelize.literal(
                "CURRENT_DATE - interval '18 years'"
              ),
            },
          },
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'birthday');
  },
};
