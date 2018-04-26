pragma solidity 0.4.18;

import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract SimpleVoting {
    using SafeMath for uint;

    modifier validOption(uint option) {
        require(option < m_options.length);
        _;
    }

    function SimpleVoting() public {
        m_options.push('Gagarin');
        m_options.push('Leonov');
        m_options.push('Armstrong');
        m_options.push('Aldrin');
    }


    function vote(uint option)
        public
        validOption(option)
    {
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

    /// @notice Gets current winner as a string
    function winner() public view returns (string) {
        return m_options[winnerId()];
    }


    /// @notice list of vote options indexed by option id
    string[] public m_options;

    //// @notice vote count: id => count
    mapping (uint => uint) public m_votes;
}
