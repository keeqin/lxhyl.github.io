class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


/**
 *
 *
 * @class Tree
 */
class Tree {
    constructor(value) {
        this.tree = new Node(value);
    }
    /**
     * 插入
     *
     * @param {Object} value 要插入的值
     * @memberof Tree
     */
    insert(value) {
        // 创建新节点
        let newNode = new Node(value)
        /**
        *  递归比较新旧节点
        *  判断新值的插入位置
        **/
        const insertHelpFun = (newNode, oldNode) => {
            //新值小于当前节点值，插入在左边 
            if (newNode.value < oldNode.value) {
                // 当前节点有左节点
                if (oldNode.left) {
                    //并且左节点的值小于要插入的值
                    if (oldNode.left.value < newNode.value) {
                        let tempNodeLeft = oldNode.left;
                        oldNode.left = newNode;
                        newNode.left = tempNodeLeft;
                    } else {
                        // 要插入比较小，那就继续递归
                        insertHelpFun(newNode, oldNode.left);
                    }
                } else {
                    // 没有就插入
                    oldNode.left = newNode;
                }
            }else{
               if(oldNode.right){
                   if(newNode.value === oldNode.value){
                       let tempNodeRight = oldNode.right;
                       oldNode.right = newNode;
                       newNode.right = tempNodeRight;
                   }else{
                       insertHelpFun(newNode,oldNode.right)
                   }
               }else{
                   oldNode.right = newNode;
               }
            }
           
        }
        //调用函数
        insertHelpFun(newNode, this.tree);
    }

    /**
     * 以数组形式插入多条
     * 
     * @param {*} arr
     * @memberof Tree
     */
    insertMore(arr) {
        arr.forEach(item => {
            this.insert(item);
        });
    }

    /**
     * 先序遍历
     *
     * @param {*} node 树 
     * @returns 所有元素的结果数组
     * @memberof Tree
     */
    preOrder(node) {
        const traversalHelpFun = node => {
            if (node) {
                console.log(node.value);
                traversalHelpFun(node.left);
                traversalHelpFun(node.right);
            }
        }
        traversalHelpFun(node);
    }
    /**
     * 中序遍历
     *
     * @param {*} node
     * @memberof Tree
     */
    inOrder(node) {
        const traversalHelpFun = node => {
            if (node) {
                traversalHelpFun(node.left);
                console.log(node.value);
                traversalHelpFun(node.right);
            }
        }
        traversalHelpFun(node);
    }
    // 后序遍历
    /**
     *
     *
     * @param {*} node
     * @memberof Tree
     */
    postOrder(node) {
        const traversalHelpFun = node => {
            if (node) {
                traversalHelpFun(node.left);
                traversalHelpFun(node.right);
                console.log(node.value);
            }
        }
        traversalHelpFun(node);
    }
    /**
     * 层序遍历 
     * BFC 广度优先搜索  从顶层开始
     * @param {*} node
     * @return {Array} 由每层元素组成的二维数组
     * @memberof Tree
     */
    levelOrder(node) {
        let result = []; // 结果数组
        let fatherArr = [node]; // 当前遍历的那一层节点
        while (fatherArr.length > 0) {
            let tempArr = []; // 临时存值的节点
            let childNodeArr = [];
            for (let i = 0; i < fatherArr.length; i++) {
                //把每个值都push进tempArr
                tempArr.push(fatherArr[i].value);
                // 找到所有子节点，并push进childNodeArr;
                if (fatherArr[i].left) {
                    childNodeArr.push(fatherArr[i].left);
                }
                if (fatherArr[i].right) {
                    childNodeArr.push(fatherArr[i].right);
                }
            }
            //找到所有值push进结果数组
            result.push(tempArr);
            //进入下一层
            fatherArr = childNodeArr;
        }
        return result;
    }
    /**
     *  返回最小值
     *
     * @param {*} node
     * @return {number} 最小值
     * @memberof Tree
     */
    min(node) {
        // 二叉搜索树的特点最小值为左下角，
        let tempNode = node;
        while (tempNode) {
            if (tempNode.left === null) {
                return tempNode.value;
            } else {
                tempNode = tempNode.left;
            }
        }
    }
    /**
     * 返回最大值
     * 
     * @param {*} node
     * @memberof Tree
     */
    max(node) {
        // 二叉搜索树的特点最小值为右下角，
        let tempNode = node;
        while (tempNode) {
            if (tempNode.left === null) {
                return tempNode.value;
            } else {
                tempNode = tempNode.right;
            }
        }
    }
    /**
     * 查找给定值
     * 二分查找加递归
     * @param {*} value
     * @memberof Tree
     */
    find(value){
       const findHelpFun = (value,nowNode) => {
             if(value === nowNode.value){
                 return nowNode;
             }
             if(value < nowNode.value){
               return  findHelpFun(value,nowNode.left);
             }
             if(value > nowNode.value){
                return findHelpFun(value,nowNode.right);
             }

       }
       let result = findHelpFun(value,this.tree);
       return result ? result : '未找到'
    }
}



let myTree = new Tree(100);
myTree.insertMore([99, 101, 98, 99, 100, 101,100,100,101]);
myTree.inOrder(myTree.tree);
// console.log(myTree.find(101));
