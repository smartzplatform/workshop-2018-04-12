pragma solidity 0.4.18;


contract SimpleVoting {
    function SimpleVoting() public {
        m_options[0] = 'Gagarin';
        m_options[1] = 'Leonov';
        m_options[2] = 'Armstrong';
        m_options[3] = 'Aldrin';
    }


    function vote(uint option) public {
        require(bytes(m_options[option]).length > 0);

        m_votes[option]++;
    }


    /// @notice vote options: id => option name
    mapping (uint => string) public m_options;

    //// @notice vote count: id => count
    mapping (uint => uint) public m_votes;
}
