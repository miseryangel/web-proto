import { randomIntFromInterval } from './arrayGenerator';

function randomRadixElement(len:number):number[]{
    const ele = [] as number[];
    for (let i = 0;  i < len ; i++){
        if (i === 0){
            ele.push(randomIntFromInterval(1,9));
        }else{
            ele.push(randomIntFromInterval(0,9));
        }
    }
    return ele;
}

export const radixGenerator = (wordLength:number,len:number):number[][] =>{
    const radixArray = [] as number[][];
    for (let i = 0; i < len; i++){
        radixArray.push(randomRadixElement(wordLength));
    }
    return radixArray;
}


export const radixSort = (arr:number[][], idx:number) =>{
    console.log("before sorted",arr);
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr.length - i - 1; j++){
            if (arr[j][idx] > arr[j+1][idx]){
                const tmp = [...arr[j]];
                arr[j] = [...arr[j+1]];
                arr[j+1] = tmp;
            }
        }
    }
    console.log("whyy array not sorted",arr);
    return arr;
}