import _ from "https://deno.land/std@0.120.0/node/module.ts";

// const httpGet = async (url) => {
//     const data = await fetch(url).then(data => data.json());
//     return data;
// }

/* 
* @params {string} '["[\"orai1u0vfsjqh0uztlmlwv9cswggn5xkvrt4sayaxme\"]"]'
*/

const main = async () => {
    const responses = [];
    // I know this is dumb but i'm lazy to write a new contract :<
    // We use contract with code id: 294
    // source contract code: https://github.com/oraichain/oraiwasm/blob/master/package/base/provider/src/helpers.rs
    // In this script we'll only care the about the first element in the array
    // const accountUser = "orai1u0vfsjqh0uztlmlwv9cswggn5xkvrt4sayaxme";
    // const url = `https://lcd.testnet.orai.io/cosmos/bank/v1beta1/balances/${accountUser}`;
    // const result = await httpGet(url);
    // for (let objectStruct of result.balances) {
    //     if (objectStruct.denom == "orai") {
    //         responses.push({
    //             account: accountUser,
    //             amounts: [objectStruct.amount]
    //         });
    //     }
    // }
    console.log(JSON.stringify([{
        account: "oraivaloper18hr8jggl3xnrutfujy2jwpeu0l76azprkxn29v",
        amounts: ["663830101955980558336.00000000"]
    }
    ]))
};

main()