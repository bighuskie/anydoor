<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ title }}</title>
    <style>
      body {
        padding: 20px;
      }
      a {
        margin-right: 20px;
      }
    </style>
  </head>
  <body>
    {{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a>
    {{/each}}
  </body>
</html>
