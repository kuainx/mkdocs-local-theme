## 基础语法（Markdown）
* 快速跳转到[下一节](#_7)
* 阅读[完整版本](./markdown.md)


### 段落、标题、区块代码

由1~6个`#`组成H1至H6的标题，在`#`与标题文字中间需要有一个空白

一个段落是由一个以上的连接的行句组成，而一个以上的空行则会划分出不同的段落（空行的定义是显示上看起来像是空行，就被视为空行，例如有一行只有空白和 tab，那该行也会被视为空行），一般的段落不需要用空白或换行缩进。

区块引用则使用 email 形式的 '`>`' 角括号。

Markdown 语法:
```md
##### h5
###### h6

Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

The quick brown fox jumped over the lazy
dog's back.

> This is a blockquote.
> 
> This is the second paragraph in the blockquote.
>
> #### This is an H4 in a blockquote
```
输出结果
>##### h5
>###### h6
>
>Now is the time for all good men to come to
>the aid of their country. This is just a
>regular paragraph.
>
>The quick brown fox jumped over the lazy
>dog's back.
>
>> This is a blockquote.
>> 
>> This is the second paragraph in the blockquote.
>>
>> #### This is an H4 in a blockquote

### 修辞和强调

Markdown 使用星号和底线来标记需要强调的区段。

Markdown 语法:
```md
Some of these words *are emphasized*.
Some of these words _are emphasized also_.
Use two asterisks for **strong emphasis**.
Or, if you prefer, __use two underscores ins tead__.
```
输出结果
>Some of these words *are emphasized*.
>Some of these words _are emphasized also_.
>Use two asterisks for **strong emphasis**.
>Or, if you prefer, __use two underscores instead__.
	

### 列表

无序列表使用星号、加号和减号来做为列表的项目标记，这些符号是都可以使用的：
```md
* Candy.
+ Gum.
- Booze.
```
输出结果
>* Candy.
>+ Gum.
>- Booze.

有序的列表则是使用一般的数字接着一个英文句点作为项目标记：
```md
1. Red
2. Green
3. Blue
```
输出结果
>1. Red
>2. Green
>3. Blue

需要说明的是，输出的编号与书写的编号无关，你甚至可以这样写
```md
233. Red
566. Green
888. Blue
```
输出结果
>233. Red
>566. Green
>888. Blue

但是仍然推荐从1开始，因为可能将来会添加对有序列表自定义起始项的支持

如果你在项目之间插入空行，那项目的内容会用 `<p>` 包起来，你也可以在一个项目内放上多个段落，只要在它前面缩排 4 个空白或 1 个 tab 。
```md
* A list item.
With multiple paragraphs.

* Another item in the list.
```
输出结果
>* A list item.
>With multiple paragraphs.
>
>* Another item in the list.


### 链接

Markdown 支援两种形式的链接语法： *行内* 和 *参考* 两种形式，两种都是使用角括号来把文字转成连结。

行内形式是直接在后面用括号直接接上链接：
```md
This is an [example link](http://example.com/).
```
输出结果
>This is an [example link](http://example.com/).

你也可以选择性的加上 title 属性：
```md
This is an [example link](http://example.com/ "With a Title").
```
输出结果
>This is an [example link](http://example.com/ "With a Title").

参考形式的链接让你可以为链接定一个名称，之后你可以在文件的其他地方定义该链接的内容：
```md
I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

[1]: http://google.com/ "Google"
[2]: http://search.yahoo.com/ "Yahoo Search"
[3]: http://search.msn.com/ "MSN Search"
```
输出结果
>I get 10 times more traffic from [Google][1] than from
>[Yahoo][2] or [MSN][3].

[1]: http://google.com/ "Google"
[2]: http://search.yahoo.com/ "Yahoo Search"
[3]: http://search.msn.com/ "MSN Search"


title 属性是选择性的，链接名称可以用字母、数字和空格，但是不分大小写：
```md
I start my morning with a cup of coffee and
[The New York Times][NY Times].

[ny times]: http://www.nytimes.com/
```
输出结果
>I start my morning with a cup of coffee and
>[The New York Times][NY Times].

[ny times]: http://www.nytimes.com/

### 图片

图片的语法和链接很像。

行内形式（title 是选择性的）：
```md
![alt text](/path/to/img.jpg "Title")
```
参考形式：
```md
![alt text][id]

[id]: /path/to/img.jpg "Title"
```
上面两种方法都会输出 HTML 为：
```html
<img src="/path/to/img.jpg" alt="alt text" title="Title" />
```
### 代码

使用 ` ` ` 符号来标记行内代码
```md
You may modify the behavior of the sort using the optional parameter sort_flags, for details see `sort()`.
```
输出结果
>You may modify the behavior of the sort using the optional parameter sort_flags, for details see `sort()`.

使用` ``` `来标记大段代码（使用更多` ` `可使中间的被当做代码处理）
``````md
Example #1 ksort() example
```
<?php
$fruits = array("d"=>"lemon", "a"=>"orange", "b"=>"banana", "c"=>"apple");
ksort($fruits);
foreach ($fruits as $key => $val) {
    echo "$key = $val\n";
}
?>
```
The above example will output:
``````

输出结果
>Example #1 ksort() example
```
<?php
$fruits = array("d"=>"lemon", "a"=>"orange", "b"=>"banana", "c"=>"apple");
ksort($fruits);
foreach ($fruits as $key => $val) {
    echo "$key = $val\n";
}
?>
```
The above example will output:


## 插件和扩展
* 回到[上一节](#markdown)

出来基础MD语法之外，文档可以安装一些插件（Plugins）和扩展（Extensions）

### 扩展
#### CodeHilite
* [Origin](https://squidfunk.github.io/mkdocs-material/extensions/codehilite/)
* [Language list](http://pygments.org/languages)

##### 安装
```md
pip install pygments
```

##### 使用
* 语法高亮
````python
``` python
import tensorflow as tf
```
````
输出结果
``` python
import tensorflow as tf
```
* 单行高亮
````python
``` python hl_lines="3 4"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````
输出结果
``` python hl_lines="3 4"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

#### InlineHilite
* [Origin](https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/#overview)
行内代码高亮插件，继承 CodeHilite 语法
* 使用方法
```md
`:::language mycode`
`#!language mycode` 
```
* 示例
```js
Here is some code: `#!js function pad(v){return ('0'+v).split('').reverse().splice(0,2).reverse().join('')}`.

The mock shebang will be treated like text here: ` #!js var test = 0; `.
```
输出结果

Here is some code: `#!js function pad(v){return ('0'+v).split('').reverse().splice(0,2).reverse().join('')}`.

The mock shebang will be treated like text here: ` #!js var test = 0; `.

#### Admonition
* [Origin](https://squidfunk.github.io/mkdocs-material/extensions/admonition/)
#####正常使用
* 基本方式
``` markdown
!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

* 自定义标题
``` markdown
!!! note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

* 隐藏标题
``` markdown
!!! note ""
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! note ""
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

* 使用代码段

````mysql
!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
    ```mysql
    SELECT
      Employees.EmployeeID,
      Employees.Name,
      Employees.Salary,
      Manager.Name AS Manager
    FROM
      Employees
    LEFT JOIN
      Employees AS Manager
    ON
      Employees.ManagerID = Manager.EmployeeID
    WHERE
      Employees.EmployeeID = '087652';
    ```
````
输出结果

!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
    ```mysql
    SELECT
      Employees.EmployeeID,
      Employees.Name,
      Employees.Salary,
      Manager.Name AS Manager
    FROM
      Employees
    LEFT JOIN
      Employees AS Manager
    ON
      Employees.ManagerID = Manager.EmployeeID
    WHERE
      Employees.EmployeeID = '087652';
    ```

* PyMdown.Details 插件添加了对可折叠块的支持
* 在问号后添加`+`可以让折叠块默认展开
```markdown
??? note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
    
???+ note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

输出结果

??? note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

???+ note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

##### 样式修改
----
* Note
* 参考使用：笔记note、参阅seeAlso
``` markdown
!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Abstract
* 参考使用：摘要abstract、概要summary、命令行简介tldr
``` markdown
!!! abstract
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! abstract
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Info
* 参考使用：信息info、备忘录todo
``` markdown
!!! info
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! info
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Tip
* 参考使用：提示tip、线索hint、重点important
``` markdown
!!! tip
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! tip
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Success
* 参考使用：成功success、检查check、完成done
``` markdown
!!! success
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! success
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Question
* 参考使用：疑问question、帮助help、常见问题解答faq
``` markdown
!!! question
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! question
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Warning
* 参考使用：警告warning、提醒caution、注意attention
``` markdown
!!! warning
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! warning
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Failure
* 参考使用：失败failure、失误fail、丢失missing
``` markdown
!!! failure
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! failure
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Danger
* 参考使用：危险danger、错误error
``` markdown
!!! danger
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! danger
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Bug
* 参考使用：程序错误bug
``` markdown
!!! bug
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! bug
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Example
* 参考使用：示例example、短消息snippet
``` markdown
!!! example
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! example
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----
* Quote
* 参考使用：引用quote、引证cite
``` markdown
!!! quote
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```
输出结果

!!! quote
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
----








