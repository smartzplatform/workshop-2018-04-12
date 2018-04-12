pragma solidity 0.4.18;


contract SimpleVoting {
    function SimpleVoting() public {
        m_options.push('Gagarin');
        m_options.push('Leonov');
        m_options.push('Armstrong');
        m_options.push('Aldrin');
    }


    function vote(uint option) public {
        require(option < m_options.length);

        m_votes[option]++;
    }

    function winnerId() public view returns (uint) {
        assert(m_options.length > 0);

        uint winner = 0;
        uint winner_votes = m_votes[0];
        for (uint i = 1; i < m_options.length; i++) {
            if (m_votes[i] > winner_votes) {
                winner = i;
                winner_votes = m_votes[i];
            }
        }

        return winner;
    }


    /// @notice list of vote options indexed by option id
    string[] public m_options;

    //// @notice vote count: id => count
    mapping (uint => uint) public m_votes;
}