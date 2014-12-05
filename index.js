/*jslint node: true */
var fs = require('fs');
var Insert = require('sqlcmd/commands/insert').Insert;
var js_yaml = require('js-yaml');

module.exports = function(yaml) {
  /** Take a YAML string or Buffer, return a string of newline-separated SQL statements */
  var sql_statements = [];

  var data = js_yaml.safeLoad(yaml);
  var tables = Object.keys(data);
  tables.forEach(function(table) {
    sql_statements.push('-- TABLE: ' + table);

    var rows = data[table];
    rows.forEach(function(row) {
      var insert_statement = new Insert(table).set(row).toUnsafeSQL().replace(/\s+RETURNING \*/, ';');
      sql_statements.push(insert_statement);
    });
  });

  return sql_statements.join('\n');
};
