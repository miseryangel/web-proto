import { randomArray } from "./arrayGenerator";
import { BSTree, AVLTree, RedBlackTree } from "./tree";

function balancedBSTTraverse(tree:BSTree,low:number,high:number,sorted:number[]){
    if (low > high) return;
    const mid = low + Math.floor((high-low)/2);
    tree.addNode(sorted[mid]);
    balancedBSTTraverse(tree,low,mid-1,sorted);
    balancedBSTTraverse(tree,mid+1,high,sorted);
}

export const bsTreeGenerator = (len:number) =>{
    const arr = randomArray(len);
    const visited = new Set<number>(arr);
    const sorted = [] as number[];
    visited.forEach(function(val){
        sorted.push(val);
    });
    sorted.sort();
    const tree = new BSTree();
    balancedBSTTraverse(tree,0,sorted.length-1,sorted);
    return {bsTree:tree,bsTVisited:visited};
}

export const avlTreeGenerator = (len:number) =>{
    const arr = randomArray(len);
    const visited = new Set<number>(arr);
    const tree = new AVLTree();
    visited.forEach(function(val){
        tree.addNode(val);
    });
    return {avlTree:tree,avlVisited:visited};
}


export const rbTreeGenerator = (len:number) =>{
    const arr = randomArray(len);
    const visited = new Set<number>(arr);
    const tree = new RedBlackTree();
    visited.forEach(function(val){
        tree.addNode(val);
    });
    return {rbTree:tree,rbVisited:visited};
}