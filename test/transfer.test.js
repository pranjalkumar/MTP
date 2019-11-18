import { isTopic } from "web3-utils";
import { AssertionError } from "assert";

const transfer = artifacts.require("./transfer.sol");

contract('transfer',([deployer,owner,buyer])=>{
    let t
    before(async () => {
        t=await transfer.deployed()
    })
    describe('deployment', async () => {
        it('deploys successfully',async () =>{
            const address=await t.address;
            assert.notEqual(address,null);
        })
    })
    describe('images', async () => {
        let result,imageCount
        before(async () => {
            result=await t.addImage()
            imageCount=await t.imageCount();
        })
        it('adds images',async () =>{

            assert.equal(imageCount,1);
            assert.equal()
            console.log(result.logs);
        })
        it('lists images', async () => {
            const image= await t.images(imageCount);
            assert.eqaul(image.id.toNumber(),imageCount.toNumber(),'count is equal');
        })
    })
})