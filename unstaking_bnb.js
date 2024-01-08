import _ from "https://deno.land/std@0.120.0/node/module.ts";
import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js"

const httpGet = async (url) => {
    const data = await fetch(url).then(data => data.json());
    return data;
}

const stakingAbi = [
    {
        "inputs": [],
        "name": "lastUnstakingRequestId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "unstakingRequests",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ts",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isClaimed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "returnAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
]

const rpcProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org:443");
const stakingContract = new ethers.Contract(
    "0xa5263e756234d4d516930dc07290ef1f35e15111",
    stakingAbi,
    rpcProvider
)

async function getLastUnstakingIdBNB() {
    return await stakingContract.lastUnstakingRequestId();
}

const main = async () => {
    const lastUnstakingIdBNB = await getLastUnstakingIdBNB();
    const lastUnstakingIdOraichain = await httpGet("https://lcd.orai.io/cosmwasm/wasm/v1/contract/orai17sy5njqjt2skvk3d9pxtywsvjf2rasnfhkptsg8xc57v35tdkluqhd3t5l/smart/eyJsYXN0X3Vuc3Rha2luZ19pZCI6e319");

    let requests = [];

    let promises = [];

    for (let i = 0; i <= lastUnstakingIdBNB; ++i) {
        let promise = (async () => {
            let unstakeRequest = await stakingContract.unstakingRequests(i);
            return {
                id: String(i),
                amount: String(Number(unstakeRequest.amount) / Number(1e12)),
            };
        })();
        promises.push(promise);
    }
    requests = await Promise.all(promises);
    console.log(JSON.stringify(requests));
}

main()