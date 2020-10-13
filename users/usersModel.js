const db = require("../database/connection.js");

module.exports = {
  add,
  findBy,
  getAll,
};

async function add(creds) {
  try {
    const [id] = await db("users").insert(creds, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db("users as u").where(filter).select("u.*");
}

function getAll() {
  return db("users").select("username", "password", "department").orderBy("id");
}
