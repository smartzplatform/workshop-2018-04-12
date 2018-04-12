'use strict';

import expectThrow from './helpers/expectThrow';

const SimpleVoting = artifacts.require('SimpleVoting.sol');


contract('SimpleVotingTest', function(accounts) {

    it('test instantiation', async function() {
        await SimpleVoting.new();
    });

    it('test voting', async function() {
        const voting = await SimpleVoting.new();

        await expectThrow(voting.vote(10));
        await expectThrow(voting.vote(100000000));

        await voting.vote(0);
        await voting.vote(1);
        await voting.vote(0);

        await voting.vote(1);
        await voting.vote(1);

        await expectThrow(voting.vote(10));
        await expectThrow(voting.vote(100000000));
    });

});
