const path = require('path');
const express = require('express');

module.exports = [
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(path.join(__dirname, 'public')),
];
