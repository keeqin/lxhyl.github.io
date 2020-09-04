代码文件路径`/Code/数据结构算法/每日一题/2020/2020-9/index.js`   

# 257.二叉树的所有路径(2020-09-04)
```js
    const binaryTreePaths = root => {
        let result = [];
        // 深度优先遍历
        const dfs = (node,path) => {
            if(!node) return;
            // 给path拼接上 当前节点的值
            path = `${path}${node.val}`
            if(node.left === null && node.right === null){
              result.push(path)
            }else{
                // 如果还有下一层节点 则拼接上箭头
                path = `${path}->`;
                dfs(node.left,path);
                dfs(node.right,path);
            }
        }
        dfs(root,'');
        return result;
    }
```


