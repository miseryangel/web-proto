import { Nodewise } from "../../slices/bricks/node"

export const traverseHelper = (node:Nodewise|null,stack:number[],choice:number):void =>{
    if (node === null) return;
    switch(choice){
        case 1:
            traverseHelper(node.left,stack,choice);
            stack.push(node.val);
            traverseHelper(node.right,stack,choice);
            break;
        case 2:
            stack.push(node.val);
            traverseHelper(node.left,stack,choice);
            traverseHelper(node.right,stack,choice);
            break;
        case 3:
            traverseHelper(node.left,stack,choice);
            traverseHelper(node.right,stack,choice);
            stack.push(node.val);
            break;
    }
}