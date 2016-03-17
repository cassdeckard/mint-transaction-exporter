'use strict';

function doExport() {
  console.log('USER WANTS TO DO THE EXPORT');
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('export-confirm').addEventListener('click', doExport);
});
