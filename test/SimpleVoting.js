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

    it('test winnerId simple voting for 0', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(0);

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId simple voting for 1', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(1);

        assert.equal(await voting.winnerId(), 1);
    });

    it('test winnerId advanced voting for 1', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(1);
        await voting.vote(0);
        await voting.vote(1);

        assert.equal(await voting.winnerId(), 1);
    });

    it('test winnerId advanced voting for 0', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(0);
        await voting.vote(1);
        await voting.vote(0);

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId in case of a tie', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(2);
        await voting.vote(0);
        await voting.vote(1);
        await voting.vote(0);
        await voting.vote(1);

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId in case of a tie #2', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(2);
        await voting.vote(1);
        await voting.vote(1);
        await voting.vote(0);
        await voting.vote(0);

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId in case of a tie #3', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(2);
        await voting.vote(0);
        await voting.vote(0);
        await voting.vote(1);
        await voting.vote(1);

        assert.equal(await voting.winnerId(), 0);
    });
});
