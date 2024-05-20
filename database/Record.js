import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const recordDB = require('./db.json');

const getRecordForWorkoutDB = (workoutId) => {
    try {
      const record = recordDB.records.filter((record) => record.workout === workoutId);
      if (!record) {
        throw {
          status: 400,
          message: `Can't find workout with the id '${workoutId}'`,
        };
      }
    //   console.log(record);
      return record;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

export {getRecordForWorkoutDB};