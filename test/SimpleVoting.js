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

        await voting.vote(0, {from: accounts[0]});
        await voting.vote(1, {from: accounts[1]});
        await voting.vote(0, {from: accounts[2]});

        await voting.vote(1, {from: accounts[3]});
        await voting.vote(1, {from: accounts[4]});

        await expectThrow(voting.vote(10, {from: accounts[5]}));
        await expectThrow(voting.vote(100000000, {from: accounts[5]}));
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

        await voting.vote(1, {from: accounts[0]});
        await voting.vote(0, {from: accounts[1]});
        await voting.vote(1, {from: accounts[2]});

        assert.equal(await voting.winnerId(), 1);
    });

    it('test winnerId advanced voting for 0', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(0, {from: accounts[0]});
        await voting.vote(1, {from: accounts[1]});
        await voting.vote(0, {from: accounts[2]});

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId in case of a tie', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(2, {from: accounts[0]});
        await voting.vote(0, {from: accounts[1]});
        await voting.vote(1, {from: accounts[2]});
        await voting.vote(0, {from: accounts[3]});
        await voting.vote(1, {from: accounts[4]});

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId in case of a tie #2', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(2, {from: accounts[0]});
        await voting.vote(1, {from: accounts[1]});
        await voting.vote(1, {from: accounts[2]});
        await voting.vote(0, {from: accounts[3]});
        await voting.vote(0, {from: accounts[4]});

        assert.equal(await voting.winnerId(), 0);
    });

    it('test winnerId in case of a tie #3', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(2, {from: accounts[0]});
        await voting.vote(0, {from: accounts[1]});
        await voting.vote(0, {from: accounts[2]});
        await voting.vote(1, {from: accounts[3]});
        await voting.vote(1, {from: accounts[4]});

        assert.equal(await voting.winnerId(), 0);
    });


    it('test winner simple voting for 0', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(0);

        assert.equal(await voting.winner(), 'Gagarin');
    });

    it('test winner simple voting for 1', async function() {
        const voting = await SimpleVoting.new();

        await voting.vote(1);

        assert.equal(await voting.winner(), 'Leonov');
    });

});
