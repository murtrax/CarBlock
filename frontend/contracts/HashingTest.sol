pragma solidity ^0.5.0;

contract HashingTest {
    
    struct DataHash {
        uint id;
        string hash;
    }
    
    event Transferred(address from, string hash);
    
    DataHash[] public allHashes;
    uint nextID = 1;
    
    // Might not need this function. (Written just in case something happens)
    function storeHash(string memory hash) public returns(string memory) {
        allHashes.push(DataHash(nextID, hash));
        nextID++;
    }
    
    
    function eventGenerator(string memory _hash) public returns(bool success) {
        allHashes.push(DataHash(nextID, _hash));
        emit Transferred(msg.sender, _hash);
        return true;
    }
    
}
