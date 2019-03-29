# JS 语言
## 说在前面
* *JavaScript 是世界上最流行的编程语言。*
* JavaScript 是脚本语言
    * JavaScript 是一种轻量级的编程语言。
    * JavaScript 是可插入 HTML 页面的编程代码。
    * JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。
    * JavaScript 很容易学习<c>你觉得呢</c>。

???note "JavaScript和Java"
    * JavaScript和Java没有半毛钱关系
    * 看起来名字很像，但是无需担心
    * 如果你认为他们在语法上有些相似，那也可以，但是面向对象的语言也是很多的哦

???quote "Atwood定律"
    * Any application that can be written in JavaScript, will eventually be written in JavaScript.
    * 任何可以用JavaScript来写的应用，最终都将用JavaScript来写

### 关于JS
* JS是一门面向对象的语言
* JS是一门跨平台语言

### 学会看指南
* JS含量太广了，此处无法列举，详细信息需要查看文档（Documents）
* 以下列举一些常用JS文档
    * MDN（推荐）：Mozilla开发者网络（Mozilla Developer Network）
        * Mozilla组织一个标准定义界面，是最新的
        * 大部分页面都有中文，部分为机翻，如果发现很奇怪，请观察原版，便于理解
        * 如果只有英文，请结合你<c>初中毕业</c>的英语能力进行阅读
        * 文档和指令集一般都有许多专有名词，直接硬上就行了
        * 可以结合百度搜索限定功能，如`audio MDN`或`audio site:mozilla.org`
    * W3School/W3CSchool
        * 也有一些JS介绍
        * 有些版本叫老，新指令没有

### 一些JS框架
* JS框架分几类，一类是JQuery这类方法框架，一类是AmazeUI，Bootstrap之类的样式框架，还有React这种不知道怎么分的
* 我们需要了解的有`JQuery`和`AmazeUI`

## JS的一些基础指令
### 脚本语言
* JS是脚本语言：即，可以直接在解析器（一般是浏览器JS引擎）中进行解析后立即执行，而无需另外编译出可执行文件
* 这样的好处是JS可以便利的被执行，并且有优良的跨平台特性
* 但缺点也存在，即：他人可以很明显获取JS的源代码，所以JS代码中不能存放一些敏感信息

## 变量
* 作为编程语言不可缺少的东西，JS也有变量
* **变量是存储信息的容器。**

### 变量概述
* 就像代数那样
```js
x=2
y=3
z=x+y
```
* 在代数中，我们使用字母（比如 `x`）来保存值（比如 `2`）。
* 通过上面的表达式 `z=x+y`，我们能够计算出 `z` 的值为 `5`。
* 在 `JavaScript` 中，这些字母被称为变量。
* JavaScript 变量
* 与代数一样，JavaScript 变量可用于存放值（比如 x=2）和表达式（比如 z=x+y）。
* 变量需要进行命名（比如 age, sum, totalvolume），在开发时，我们推荐使用语义化的命名方式（如：存储姓名的变量为name），这样方便以后修改和阅读。
* 变量的命名规范
    * 变量必须以字母开头
    * 变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
    * 变量名称对大小写敏感（y 和 Y 是不同的变量）
* **提示：**JavaScript 语句和 JavaScript 变量都对大小写敏感。

### JavaScript 数据类型
* JavaScript 变量还能保存其他数据类型，比如文本值 (name="Bill Gates")。
* 在 JavaScript 中，类似 "Bill Gates" 这样一条文本被称为字符串。
* 当您向变量分配文本值时，应该用双引号或单引号包围这个值。
* 当您向变量赋的值是数值时，不要使用引号。如果您用引号包围数值，该值会被作为文本来处理。
* JS数据类型有：字符串（文本），逻辑（布尔值），数字，对象（Object），Undefined，Null，数组（Array）

!!!quote "数组"
    * 数组是一堆相同类型变量的集合
    * 一个数组中所有变量**只能有一个类型**
    * 调用数组中的变量可以使用`数组名[键名]`会返回键值
    * 一般数组的键名都是数字，初次给数组赋值或`push`时会自动追加和赋给新键名
    * 当然你可以手动跳号赋值
    * 键名可以是负数

### 变量实例

```js
var pi=3.14;
var name="Bill Gates";
var answer='Yes I am!';
```
* [亲自试一试](http://www.w3school.com.cn/tiy/t.asp?f=js_data2)

### 声明（创建） JavaScript 变量
* 在 JavaScript 中创建变量通常称为“声明”变量。
* 我们使用 var 关键词来声明变量：
```js
var carname;
```js
* 变量声明之后，该变量是空的（它没有值）。
* 如需向变量赋值，请使用等号：
```js
carname="Volvo";
```
* 不过，您也可以在声明变量时对其赋值：
```js
var carname="Volvo";
```
* 在下面的例子中，我们创建了名为 carname 的变量，并向其赋值 "Volvo"，然后把它放入 id="demo" 的 HTML 段落中：
```js
var carname="Volvo";
document.getElementById("demo").innerHTML=carname;
```
* [亲自试一试](http://www.w3school.com.cn/tiy/t.asp?f=js_variables1)
* **提示：**一个好的编程习惯是，在代码开始处，统一对需要的变量进行声明。
* 一条语句，多个变量
* 您可以在一条语句中声明很多变量。该语句以 var 开头，并使用逗号分隔变量即可：
```js
var name="Gates", age=56, job="CEO";
```
* 声明也可横跨多行：
```js
var name="Gates",
age=56,
job="CEO";
```
### undefined
* 在计算机程序中，经常会声明无值的变量。未使用值来声明的变量，其值实际上是 undefined。
* 在执行过以下语句后，变量 `carname` 的值将是 `undefined`：
```js
var carname;
```

### JS变量作用域
#### 全局变量
* 在JS文件最外层（或直接在`script`标签中声明变量）（`script`标签作用等同于外联JS文件，以下不再重复）
* 不以变量声明关键字声明的变量，如`num=1;`，该声明不受位置限制，都是全局变量，**但是这种写法很混乱，不推荐使用**

#### 局部变量
* 以`Var`关键字声明的变量，如`var name="a";`
* 作用域为该变量声明的函数及其内部嵌套的函数
* 当然可以读取其值只能在该变量声明之后
* 例子（作用域标黄）
```js hl_lines="4 5 6 7 8"
function a(){
    function b(){
        ...
        var name = "a";
        ...
        for (var i=0;i<cars.length;i++){
        ...
        }
    }
}
```

* let(未完待续)








### 面向对象
* JS是一个面向对象的语言
* JS中的函数，也是对象（一般是Window）的方法
* 一般的不加对象的函数，实际都生命在了Window对象中，Window可省略，如Window.open()可以简写为open()
















