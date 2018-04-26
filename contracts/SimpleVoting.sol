pragma solidity 0.4.18;

import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract SimpleVoting {
    using SafeMath for uint;

    event Voted(address indexed sender, uint option);

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
        require(!m_voted[msg.sender]);

        m_votes[option]++;
        m_voted[msg.sender] = true;

        Voted(msg.sender, option);
    }

    /**
     * @notice Finds id of a winner
     *
     * @return id of a winner
     */
    function winnerId() public view returns (uint) {
        /*
         * Options should not
         * be empty.
         * Because: ...
         */
        assert(m_options.length > 0);

        uint winner = 0;
        uint winner_votes = m_votes[0];
        // Finding a winner
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

    mapping (address => bool) public m_voted;
}
