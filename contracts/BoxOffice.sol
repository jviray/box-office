pragma solidity ^0.4.24;

contract BoxOffice {

    struct Show {
        string artistName;
        uint ticketPrice;
        address[] attendees;
        mapping (address => bool) didUserBuy;
    }

    Show[] public shows;

    mapping (bytes32 => uint) private nameToId;

    modifier costs(uint _ticketPrice) {
        if (msg.value >= _ticketPrice * 1 ether) {
            _;
        }
    }

    function addShow(string _artistName, uint _ticketPrice) public {
        bytes32 _name = stringToBytes32(_artistName);
        nameToId[_name] = shows.push(Show(_artistName, _ticketPrice, new address[](0))) - 1;
    }

    function buyTicket(string _artistName) public payable {
        bytes32 _name = stringToBytes32(_artistName);
        Show storage show = shows[nameToId[_name]];
        require(msg.value >= show.ticketPrice * 1 ether);
        show.attendees.push(msg.sender);
        show.didUserBuy[msg.sender] = true;
    }

    function confirmPurchase(address _userAddress, string _artistName) public view returns (bool) {
        bytes32 _name = stringToBytes32(_artistName);
        return shows[nameToId[_name]].didUserBuy[_userAddress];
    }

    function stringToBytes32(string memory _source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(_source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(_source, 32))
        }
    }
}
