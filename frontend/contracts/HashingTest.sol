pragma solidity ^0.5.0;

contract HashingTest {

    event Transferred(address from, string carDetailsHash, string ownerDetailsHash, string serviceDetailsHash, string accidentDetailsHash);

    function eventGenerator(string memory _carDetailsHash, string memory _ownerDetailsHash, string memory _serviceDetailsHash, string memory _accidentDetailsHash) public returns(bool success) {
        //allHashes.push(DataHash(nextID, _hash));
        emit Transferred(msg.sender, _carDetailsHash, _ownerDetailsHash, _serviceDetailsHash, _accidentDetailsHash);
        return true;
    }
   
}

