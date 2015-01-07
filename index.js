/*jslint node: true */
var fs = require('fs');
var js_yaml = require('js-yaml');

var db = require('sqlcmd-sql');

/** yaml2sql(yaml_string)

Take a YAML string or Buffer, return a string of newline-separated SQL statements.
*/
module.exports = function(yaml) {
  var sql_statements = [];

  var data = js_yaml.safeLoad(yaml);
  var tables = Object.keys(data);
  tables.forEach(function(table) {
    sql_statements.push('-- TABLE: ' + table);

    var rows = data[table];
    rows.forEach(function(row) {
      db.Insert(table).set(row).execute(function(err, result) {
        if (err) throw err;
        sql_statements.push(result[0] + ';');
      });
    });
  });

  return sql_statements.join('\n');
};
