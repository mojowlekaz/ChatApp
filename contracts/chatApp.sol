// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.5;


contract chatApp {

    struct user{
        string name;
        friend[] friendlist;
    }
    
    struct friend{
        address addr;
        string name;

    }
    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AlluserStruck{
        string name;
        address UsersAddr;
    }

    AlluserStruck[] getAllUsres;
    
    mapping (address => user) userList;
    mapping (bytes32 => message[]) allMessages;


    function checkUserExist(address addr) public view returns(bool) {
        return bytes(userList[addr].name).length > 0;
    }

    function createAccount(string calldata  name) external {
        require(checkUserExist(msg.sender) ==false, "User Already exist");
        require(bytes(name).length > 0 , "Username can not be empty");
        userList[msg.sender].name = name;
        getAllUsres.push(AlluserStruck(name , msg.sender));


    }

    function getUsername(address addr) external view returns(string memory) {
        require(checkUserExist(addr), "user not registered");
        return userList[addr].name;
    }

    function addFriend(address addr, string calldata name) external {
        require(checkUserExist(msg.sender), "create an Account");
        require(checkUserExist(addr), "user does not have  an Account");
        require(msg.sender != addr, "you can not add yourself as friend");
        require(checkAlreadyFriend(msg.sender, addr) == false, "You are already friend with this user");
        _addFriend(msg.sender, addr, name);
        _addFriend(addr, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriend(address addr1, address addr2) internal view returns(bool){
        if(userList[addr1].friendlist.length > userList[addr2].friendlist.length){
            address tmp = addr1;
            addr1 = addr2;
            addr2 = tmp;
        }
        for(uint256 i = 0; i < userList[addr1].friendlist.length; i++){
            if(userList[addr1].friendlist[i].addr == addr2) return true;
        }
        return false;
    }


    function _addFriend(address me, address friendAddr, string memory name) internal {
        friend memory newFriend = friend(friendAddr, name);
        userList[me].friendlist.push(newFriend);
    }

    function getMyFtiends() external view returns(friend[] memory) {
        return userList[msg.sender].friendlist;
    }
    function _getChatCode(address addr1 , address addr2) internal pure returns(bytes32) {
        if(addr1 < addr2) {
            return keccak256(abi.encodePacked(addr1, addr2));
        }else{
            return keccak256(abi.encodePacked(addr2, addr1));
        }
    }

    function sendMessage(address addr, string calldata _msg) external {
        require(checkUserExist(msg.sender), "create an Account");
        require(checkUserExist(addr), "user does not have  an Account");
        require(msg.sender != addr, "you can not add yourself as friend");
        require(checkAlreadyFriend(msg.sender, addr), "You are already frineds with this user");
        bytes32 chatCode = _getChatCode(msg.sender, addr);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    function readMessage(address addr) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, addr);
        return allMessages[chatCode];
    }

    function FetchAllusers() public view returns(AlluserStruck[] memory) {
        return getAllUsres;
    }

    
}