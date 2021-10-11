function check(store: number[], limit: number, len:number){
    let res = 0;
    for (let i = 0; i < limit; i++){
      let cur = store[i];
      res |= 1<<cur;
      if (cur + limit - i < len) res |= (1<<(cur + limit - i));
      if (cur - limit + i >= 0) res |= (1<<(cur - limit + i));
    }
    return res;
}

function transform(store: number[], level:number){
    let ans = 0;
    for (let i = 0; i < level; i++){
      ans += (store[i]+1)*Math.pow(10,i);
    }
    return ans;
}

function nQueenTraverse(records:Array<number[]>, dp:number[],store:number[],level:number){
    const len = store.length, val = transform(store,level);
    if (level === len){
      dp.push(val);
      return;
    }
    for (let i = 0; i < len; i++){
      records.push([val,level,i,0]);
      const option:number = level === 0?0:check(store,level,len);
      if (((1<<i)&option) === 0){
        records.push([val,level,i,1]);
        store[level] = i;
        nQueenTraverse(records,dp,store,level+1);
        records.push([val,level,i,0]);
      }
    }
};


export const nQueueGenerator = (len:number) =>{
    const dp:number[] = [], records:Array<number[]> = [];
    const st: number[] = new Array(len).fill(-1);
    nQueenTraverse(records,dp,st,0);
    return {records:records,dp:dp};
}
