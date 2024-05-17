// In src/database/utils.js
import fs from 'fs';

const saveToDatabase = (DB) => {
  fs.writeFileSync("./database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

export {saveToDatabase}