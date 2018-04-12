'use strict';

import expectThrow from './helpers/expectThrow';

const SimpleVoting = artifacts.require('SimpleVoting.sol');


contract('SimpleVotingTest', function(accounts) {

    it('test instantiation', async function() {
        await SimpleVoting.new();
    });

});
