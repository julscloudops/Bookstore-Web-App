const express = require('express'),
      router = express.Router(),
      searchController = require('./controller');
 

router.get('/:query', searchController.searchEngine);

module.exports = router;


