var models = require("../models");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  models.sequelize
    .query(
      `SELECT
          name,
          birth_date,
		  to_char(birth_date, 'MMDD') AS birthday,
          EXTRACT(YEAR FROM age(birth_date)) AS age
      FROM
          "People"
      WHERE
      	  to_char(current_timestamp, 'MMDD') < to_char(birth_date, 'MMDD')
      ORDER BY
          birthday ASC`,
      {
        model: models.Person
      }
    )
    .then(function(people) {
      res.render("index", { title: "Celebrities, ordered by age", people: people });
      console.log("First person: " + people[0].name);
    });
});

module.exports = router;
