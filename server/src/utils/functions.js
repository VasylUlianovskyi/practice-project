const db = require('../models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort
) => {
  const object = {
    where: {},
    order: [],
  };

  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: parseInt(contestId, 10) });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push([
      'prize',
      awardSort.toLowerCase() === 'asc' ? 'ASC' : 'DESC',
    ]);
  }

  Object.assign(object.where, {
    status: {
      [db.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });

  object.order.push(['id', 'DESC']);

  return object;
};
function getPredicateTypes (index) {
  return { [db.Sequelize.Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

module.exports.mapStringToValues = v => {
  switch (v) {
    case 'true':
      return true;
    case 'false':
      return false;
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    case 'NaN':
      return NaN;
    default:
      return v;
  }
};
