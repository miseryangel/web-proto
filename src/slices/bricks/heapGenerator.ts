import { MAX_HEAP } from "./symbol";
const capacity = 25;

export class Heap{
    arr:number[];
    len:number;
    type:Symbol;

    constructor(arr:number[],type:symbol){
        this.arr = new Array(capacity).fill(-1e4);
        this.len = arr.length;
        this.type = type;
        const tmp = arr;
        this.type === MAX_HEAP?tmp.sort((a,b)=>b-a):tmp.sort((a,b)=>a-b);
        for (let i = 0; i < this.len; i++){
            this.arr[i] = tmp[i];
        }
    }

    add(val:number){
        this.arr[this.len] = val;
        this.len++;
        this.upheapify(this.len-1);
    }

    remove(){
        this.arr[0] = this.arr[--this.len];
        this.arr[this.len] = -1e4;
        this.downheapify(0);
    }

    private upheapify(idx:number){
        const cur = idx, nxt = cur%2 === 0? cur/2-1:(cur-1)/2;
        if (cur === 0){
            return;
        }
        if (this.type === MAX_HEAP){
            if (this.arr[cur] <= this.arr[nxt]){
                return;
            }else{
                const tmp = this.arr[cur];
                this.arr[cur] = this.arr[nxt];
                this.arr[nxt] = tmp;
                this.upheapify(nxt);
            }
        }else{
            if (this.arr[cur] >= this.arr[nxt]){
                return;
            }else{
                const tmp = this.arr[cur];
                this.arr[cur] = this.arr[nxt];
                this.arr[nxt] = tmp;
                this.upheapify(nxt);
            }
        }
    }
    private downheapify(idx:number){
        const cur = idx, l = cur*2 + 1, r = cur*2 + 2;
        if (l >= this.len){
            return;
        }
        if (this.type === MAX_HEAP){
            if (this.arr[cur] >= this.arr[l] && (r >= this.len || this.arr[cur] >= this.arr[r])){
                return;
            }else{
                const tmp = this.arr[cur], nxt = (r>= this.len || this.arr[l]>=this.arr[r])?l:r;
                this.arr[cur] = this.arr[nxt];
                this.arr[nxt] = tmp;
                this.downheapify(nxt);
            }
        }else{
            if (this.arr[cur] <= this.arr[l] && (r >= this.len || this.arr[cur] <= this.arr[r])){
                return;
            }else{
                const tmp = this.arr[cur], nxt = (r>= this.len || this.arr[l] <= this.arr[r])?l:r;
                this.arr[cur] = this.arr[nxt];
                this.arr[nxt] = tmp;
                this.downheapify(nxt);
            }
        }
    }
}