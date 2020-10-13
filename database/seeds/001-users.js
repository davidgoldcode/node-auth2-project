exports.seed = function (knex) {
  const users = [
    { username: "Liz", password: "rowValue1", department: "Finance" },
    { username: "Clair", password: "rowValue2", department: "Accounting" },
    { username: "Pau", password: "rowValue3", department: "HR" },
  ];

  return knex("users").insert(users);
};
