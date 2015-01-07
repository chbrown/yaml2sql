# yaml2sql

Convert a yaml file to SQL INSERT statements.

This is handy if you have a yaml file with table names as keys, where each table's value is a list of objects, where those objects are rows to be inserted into the corresponding table (schema specified elsewhere).

    yaml2sql < my_data.yaml | psql my_database

`my_data.yaml`, e.g.:

    ---
    templates:
      - name: simple_header
        html: <div><h1>Heading: {{html}}<h1></div>
      - name: simple_paragraph
        html: <p>{{html}}<p>

    annotators:
      - name: Chris Brown
      - name: Gold Standard
      - name: Guest


## Installation

    npm -g install yaml2sql


## License

Copyright 2014-2015 Christopher Brown. [MIT Licensed](http://opensource.org/licenses/MIT).
