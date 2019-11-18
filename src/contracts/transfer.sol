pragma solidity ^0.5.0;
contract transfer
{
struct Image{
string name;
bool owner;
}

struct Owner{
uint imageCount;
}
mapping(address=>mapping(uint=>Image)) public Images;
mapping (address => Owner) public persons;
// struct Owner
// {
// address owner;
// mapping(address => Image) list;
// }
function addImage(string memory n) public {
persons[msg.sender].imageCount++;
uint count = persons[msg.sender].imageCount;

Images[msg.sender][count].name = n;
Images[msg.sender][count].owner = true;
}
function transferImage(uint _id,address sender) public {
if(Images[msg.sender][_id].owner == true)
{
Images[msg.sender][_id].owner = false;
persons[sender].imageCount++;
uint c= persons[sender].imageCount;

string memory nm = Images[msg.sender][_id].name;
Images[sender][c].name = nm;
Images[sender][c].owner = true;

}
}

}