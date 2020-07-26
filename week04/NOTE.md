#第四周学习笔记

##浏览器工作原理
1. URL => HTTP请求
2. HTTP请求 => DOM树
3. DOM树 => DOM树带CSS（css computing)
4. DOM树带CSS => 带位置信息的DOM树(排版)
5. 带位置信息的DOM树 => Bitmap（渲染）

## HTML Parser的构建
### 有限状态机
- 每个状态机都有确定的下一状态(Moore)
- 每个机器根据输入决定下一状态(Mealy)
### 实现步骤
1. 发送请求
2. 解析头标签
3. 解析body
4. 将body构成DOM Tree
