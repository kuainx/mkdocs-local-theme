# SQL
## 说在前面
* [Origin](http://www.w3school.com.cn/sql/index.asp)
* SQL 是用于访问和处理数据库的标准的计算机语言。
* 什么是 SQL？
  * SQL 指结构化查询语言
  * SQL 使我们有能力访问数据库
  * SQL 是一种 ANSI（美国国家标准化组织） 的标准计算机语言

### RDBMS
* RDBMS 指的是关系型数据库管理系统。
* RDBMS 是 SQL 的基础，同样也是所有现代数据库系统的基础，比如 MS SQL Server, IBM DB2, Oracle, MySQL 以及 Microsoft Access。
* RDBMS 中的数据存储在被称为表（tables）的数据库对象中。
* 表是相关的数据项的集合，它由列和行组成。

### SQL数据库查询
* 使用SQL，我们可以使用RDBMS数据库的数据
* 由于每种类型的数据库都有自己的私有方法，所以我们不推荐临时更换数据库

### 关于SQL你需要知道的事情
* 基础指令（增删改查）
* 部分限定指令（`Where`，`Like`，`=`等）
* php执行相关查询指令
* 获取相应sql语句的简便方法
* 防止sql注入的代码编写（**重要**）
* sql数据库软件的使用方法
* 了解一些危险的指令和操作<c>MySQL从删库到跑路</c>

### SQL注意事项
* SQL 对大小写不敏感
* 某些数据库系统要求在每条 SQL 命令的末端使用分号。在我们的教程中不使用分号。
* 分号是在数据库系统中分隔每条 SQL 语句的标准方法，这样就可以在对服务器的相同请求中执行一条以上的语句。

### 专有名词
* 查询(Query)：SQL数据库执行命令

## 查
* `SELECT` 语句用于从表中选取数据。
* 结果被存储在一个结果表中（称为结果集）。
* 语法
    ```sql
    SELECT 列名称 FROM 表名称
    ```
    * 以及：
    ```sql
    SELECT * FROM 表名称
    ```
* 实例
    * 如需获取名为 "LastName" 和 "FirstName" 的列的内容（从名为 "Persons" 的数据库表），请使用类似这样的 SELECT 语句：
    ```sql
    SELECT LastName,FirstName FROM Persons
    ```
    * 例表
    
    | Id   | LastName | FirstName | Address        | City     |
    | ---- | -------- | --------- | -------------- | -------- |
    | 1    | Adams    | John      | Oxford Street  | London   |
    | 2    | Bush     | George    | Fifth Avenue   | New York |
    | 3    | Carter   | Thomas    | Changan Street | Beijing  |
    
    * 结果：
    
    | LastName | FirstName |
    | -------- | --------- |
    | Adams    | John      |
    | Bush     | George    |
    | Carter   | Thomas    |

* `*` 实例
    * 现在我们希望从 "Persons" 表中选取所有的列。
    * 请使用符号 * 取代列的名称，就像这样：
    ```sql
    SELECT * FROM Persons
    ```
    * **提示：**星号（*）可以选取所有数据（此处为所有列）。
    *  结果：
    
    | Id   | LastName | FirstName | Address        | City     |
    | ---- | -------- | --------- | -------------- | -------- |
    | 1    | Adams    | John      | Oxford Street  | London   |
    | 2    | Bush     | George    | Fifth Avenue   | New York |
    | 3    | Carter   | Thomas    | Changan Street | Beijing  |

## 增

!!!warning "敏感操作"
    * 该操作为敏感操作
    * 某些服务器可能禁止该操作
    * 服务器获取客户端数据时需要禁止该关键词，防止SQL注入
    * 详见SQL注入

* `INSERT INTO` 语句用于向表格中插入新的行。
* 语法
```sql
INSERT INTO 表名称 VALUES (值1, 值2,....)
```

* 我们也可以指定所要插入数据的列：
```sql
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
```

* 插入新的行
* "Persons" 表：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |

* SQL 语句：
```sql
INSERT INTO Persons VALUES ('Gates', 'Bill', 'Xuanwumen 10', 'Beijing')
```

* 结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |

* 在指定的列中插入数据
* "Persons" 表：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |

* SQL 语句：
```sql
INSERT INTO Persons (LastName, Address) VALUES ('Wilson', 'Champs-Elysees')
```

* 结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   |           | Champs-Elysees |         |

## 改

!!!warning "敏感操作"
    * 该操作为敏感操作
    * 某些服务器可能禁止该操作
    * 服务器获取客户端数据时需要禁止该关键词，防止SQL注入
    * 详见SQL注入

`Update` 语句用于修改表中的数据。

* 语法：
```sql
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

* 表 Person:

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   |           | Champs-Elysees |         |

* 更新某一行中的一个列
* 我们为 lastname 是 "Wilson" 的人添加 firstname：
```sql
UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson' 
```

* 结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   | Fred      | Champs-Elysees |         |

!!!note "返回结果"
    * `Update`指令不会返回操作完成的结果
    * 以上结果仅表示操作完成表的状态
    * 若需要获取操作完成的结果，需要再使用`select`语句，但是**该语句不能和`Update`语句一起（以分号分隔，同一次执行中）执行**

* 更新某一行中的若干列
* 我们会修改地址（address），并添加城市名称（city）：
```sql
UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing'
WHERE LastName = 'Wilson'
```

* 结果：

| LastName | FirstName | Address      | City    |
| -------- | --------- | ------------ | ------- |
| Gates    | Bill      | Xuanwumen 10 | Beijing |
| Wilson   | Fred      | Zhongshan 23 | Nanjing |

## 删

!!!warning "敏感操作"
    * 该操作为敏感操作
    * 某些服务器可能禁止该操作
    * 服务器获取客户端数据时需要禁止该关键词，防止SQL注入
    * 详见SQL注入

* `DELETE` 语句用于删除表中的行。
* 语法
```sql
DELETE FROM 表名称 WHERE 列名称 = 值
```

* 表 Person:

| LastName | FirstName | Address      | City    |
| -------- | --------- | ------------ | ------- |
| Gates    | Bill      | Xuanwumen 10 | Beijing |
| Wilson   | Fred      | Zhongshan 23 | Nanjing |

* 删除某行
* "Fred Wilson" 会被删除：
```sql
DELETE FROM Person WHERE LastName = 'Wilson' 
```

* 结果:

| LastName | FirstName | Address      | City    |
| -------- | --------- | ------------ | ------- |
| Gates    | Bill      | Xuanwumen 10 | Beijing |

!!!note "返回结果"
    * `delete`指令不会返回操作完成的结果
    * 以上结果仅表示操作完成表的状态
    * 若需要获取操作完成的结果，需要再使用`select`语句，但是**该语句不能和`delete`语句一起（以分号分隔，同一次执行中）执行**

* 删除所有行
* 可以在不删除表的情况下删除所有的行。这意味着表的结构、属性和索引都是完整的：
```sql
DELETE FROM table_name
```
* 或者：
```sql
DELETE * FROM table_name
```

## 查询位置限定（Where）
* `WHERE` 子句
* 如需有条件地从表中选取数据，可将 `WHERE` 子句添加到 `SELECT`（或`Update`、`Delete`等） 语句。
* 语法
```sql
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
```
* 下面的运算符可在 WHERE 子句中使用：

| 操作符    | 描述         |
| --------- | ------------ |
| `=`       | 等于         |
| `<>`      | 不等于       |
| `>`       | 大于         |
| `<`       | 小于         |
| `>=`      | 大于等于     |
| `<=`      | 小于等于     |
| `BETWEEN` | 在某个范围内 |
| `LIKE`    | 搜索某种模式 |

* 使用 `WHERE` 子句
* 如果只希望选取居住在城市 "`Beijing`" 中的人，我们需要向 `SELECT` 语句添加 `WHERE` 子句：
```sql
SELECT * FROM Persons WHERE City='Beijing'
```

* "Persons" 表

| LastName | FirstName | Address        | City     | Year |
| -------- | --------- | -------------- | -------- | ---- |
| Adams    | John      | Oxford Street  | London   | 1970 |
| Bush     | George    | Fifth Avenue   | New York | 1975 |
| Carter   | Thomas    | Changan Street | Beijing  | 1980 |
| Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

* 结果：

| LastName | FirstName | Address        | City    | Year |
| -------- | --------- | -------------- | ------- | ---- |
| Carter   | Thomas    | Changan Street | Beijing | 1980 |
| Gates    | Bill      | Xuanwumen 10   | Beijing | 1985 |

* 引号的使用
* 请注意，我们在例子中的条件值周围使用的是单引号。
* SQL 使用单引号来环绕*文本值*（大部分数据库系统也接受双引号）。如果是*数值*，请不要使用引号。
* 文本值：
    * 这是正确的：
    ```sql
    SELECT * FROM Persons WHERE FirstName='Bush'
    ```
    * 这是错误的：
    ```sql
    SELECT * FROM Persons WHERE FirstName=Bush
    ```
* 数值：
    * 这是正确的：
    ```sql
    SELECT * FROM Persons WHERE Year>1965
    ```
    * 这是错误的：
    ```sql
    SELECT * FROM Persons WHERE Year>'1965'
    ```

## AND & OR
* AND 和 OR 运算符
* AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。
* 如果第一个条件和第二个条件都成立，则 AND 运算符显示一条记录（即：判定通过）。
* 如果第一个条件和第二个条件中只要有一个成立，则 OR 运算符显示一条记录（即：判定通过）。
* 原始的表 (用在例子中的)：

| LastName | FirstName | Address        | City     |
| :------- | :-------- | :------------- | :------- |
| Adams    | John      | Oxford Street  | London   |
| Bush     | George    | Fifth Avenue   | New York |
| Carter   | Thomas    | Changan Street | Beijing  |
| Carter   | William   | Xuanwumen 10   | Beijing  |

* AND 运算符实例
* 使用 AND 来显示所有姓为 "Carter" 并且名为 "Thomas" 的人：
```sql
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'
```
* 结果：

| LastName | FirstName | Address        | City    |
| :------- | :-------- | :------------- | :------ |
| Carter   | Thomas    | Changan Street | Beijing |

* OR 运算符实例
* 使用 OR 来显示所有姓为 "Carter" 或者名为 "Thomas" 的人：
```sql
SELECT * FROM Persons WHERE firstname='Thomas' OR lastname='Carter'
```
* 结果：

| LastName | FirstName | Address        | City    |
| :------- | :-------- | :------------- | :------ |
| Carter   | Thomas    | Changan Street | Beijing |
| Carter   | William   | Xuanwumen 10   | Beijing |

* 结合 AND 和 OR 运算符
* 我们也可以把 AND 和 OR 结合起来（使用圆括号来组成复杂的表达式）:
```sql
SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William')
AND LastName='Carter'
```
* 结果：

| LastName | FirstName | Address        | City    |
| :------- | :-------- | :------------- | :------ |
| Carter   | Thomas    | Changan Street | Beijing |
| Carter   | William   | Xuanwumen 10   | Beijing |

## 通配符
* 在搜索数据库中的数据时，SQL 通配符可以替代一个或多个字符。
* SQL 通配符必须与 LIKE 运算符一起使用。
* 在 SQL 中，可使用以下通配符：

| 通配符                       | 描述                       |
| ---------------------------- | -------------------------- |
| `%`                          | 替代一个或多个字符         |
| `_`                          | 仅替代一个字符             |
| `[charlist]`                 | 字符列中的任何单一字符     |
| `[^charlist]`或`[!charlist]` | 不在字符列中的任何单一字符 |

* 原始的表 (用在例子中的)：
* Persons 表:

| Id   | LastName | FirstName | Address        | City     |
| ---- | -------- | --------- | -------------- | -------- |
| 1    | Adams    | John      | Oxford Street  | London   |
| 2    | Bush     | George    | Fifth Avenue   | New York |
| 3    | Carter   | Thomas    | Changan Street | Beijing  |

* 使用 `%` 通配符
    * 例子 1
        * 现在，我们希望从上面的 "Persons" 表中选取居住在以 "Ne" 开始的城市里的人：
        * 我们可以使用下面的 `SELECT` 语句：
        ```sql
        SELECT * FROM Persons
        WHERE City LIKE 'Ne%'
        ```
        * 结果集：
        
        | Id   | LastName | FirstName | Address      | City     |
        | ---- | -------- | --------- | ------------ | -------- |
        | 2    | Bush     | George    | Fifth Avenue | New York |
        
    * 例子 2
        * 接下来，我们希望从 "Persons" 表中选取居住在包含 "lond" 的城市里的人：
        * 我们可以使用下面的 `SELECT` 语句：
        ```sql
        SELECT * FROM Persons
        WHERE City LIKE '%lond%'
        ```
        * 结果集：
        
        | Id   | LastName | FirstName | Address       | City   |
        | ---- | -------- | --------- | ------------- | ------ |
        | 1    | Adams    | John      | Oxford Street | London |

* 使用 `_` 通配符
    * 例子 1
        * 现在，我们希望从上面的 "Persons" 表中选取名字的第一个字符之后是 "eorge" 的人：
        * 我们可以使用下面的 `SELECT` 语句：
        ```sql
        SELECT * FROM Persons
        WHERE FirstName LIKE '_eorge'
        ```
        * 结果集：
        
        | Id   | LastName | FirstName | Address      | City     |
        | ---- | -------- | --------- | ------------ | -------- |
        | 2    | Bush     | George    | Fifth Avenue | New York |

    * 例子 2
        * 接下来，我们希望从 "Persons" 表中选取的这条记录的姓氏以 "C" 开头，然后是一个任意字符，然后是 "r"，然后是任意字符，然后是 "er"：
        * 我们可以使用下面的 SELECT 语句：
        ```sql
        SELECT * FROM Persons
        WHERE LastName LIKE 'C_r_er'
        ```
        * 结果集：
        
        | Id   | LastName | FirstName | Address        | City    |
        | ---- | -------- | --------- | -------------- | ------- |
        | 3    | Carter   | Thomas    | Changan Street | Beijing |

* 使用 `[charlist]` 通配符
    * 例子 1
        * 现在，我们希望从上面的 "Persons" 表中选取居住的城市以 "A" 或 "L" 或 "N" 开头的人：
        * 我们可以使用下面的 SELECT 语句：
        ```sql
        SELECT * FROM Persons
        WHERE City LIKE '[ALN]%'
        ```
        * 结果集：
        
        | Id   | LastName | FirstName | Address       | City     |
        | ---- | -------- | --------- | ------------- | -------- |
        | 1    | Adams    | John      | Oxford Street | London   |
        | 2    | Bush     | George    | Fifth Avenue  | New York |

    * 例子 2
        * 现在，我们希望从上面的 "Persons" 表中选取居住的城市*不以* "A" 或 "L" 或 "N" 开头的人：
        * 我们可以使用下面的 `SELECT` 语句：
        ```sql
        SELECT * FROM Persons
        WHERE City LIKE '[!ALN]%'
        ```
        * 结果集：
        
        | Id   | LastName | FirstName | Address        | City    |
        | ---- | -------- | --------- | -------------- | ------- |
        | 3    | Carter   | Thomas    | Changan Street | Beijing |

## PHP的SQL指令

!!!tip "mysql和mysqli"
    * 该扩展比较老，支持不佳，我们一般不用了

* 通过PHP的PDO库，我们可以调用sql数据库，详细可以查php的文档，在此仅列出需要的代码及其解释
* 相对于sql指令，执行的指令要简单的多

### 登录数据库
```
$mysql= new PDO('mysql:host=localhost;dbname=data','SQLUSER','SQLPSW')
```

* `data`是数据库名，`SQLUSER`是数据库用户名，`SQLPSW`是数据库密码
* 可以直接写常量，也可以写变量
* `$mysql`是个变量，后续操作要在上面执行，你也可以起其他名字，但是注意后续也要替换

* 如果数据有中文，需要先设置字符集，否则会出乱码
```
$mysql=new PDO('mysql:dbname=knmgcvxk;host=localhost','SQLPSW','SQLPWD',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8';"));
```

### 直接执行语句
```
$a=$mysql->query("SELECT * FROM user");
```

* `query`中间是执行的sql语句，以文本形式传参，记得引号`""`
* `query`后需要`foreach`一下
* 需要注意的是PDO`query`出来的数据会有两个，一个是以123..作为键名的，一个是以其本身键名作为键名的，都混在一个数组中，具体`print_r`输出以下就看得出来了
```
//取出一个数据在变量$res
foreach ($a as $a) {$res=$a;}
//取出数组在变量$res[]
$res=array();
foreach ($a as $key=>$value) {$res[$key]=$value;}
```

!!!warning "警告"
    * 推荐只在`query`中使用常量sql语句
    * 如果使用`query`拼接传参，需要十分谨慎，避免sql注入
    * 避免方法：验证传入参数是否含有敏感词
    * 或：传参的sql语句全部用`prepare`就完事了

### 预执行语句
```
$dat=$mysql->prepare("SELECT * FROM `user_v3` WHERE `user`=? AND `pass`=? AND `token`=?");
$dat->execute(array($_DAT['loguser'],$_DAT['logpass'],$_DAT['logtok']));
```

* 现将需要执行的语句写好，需要填入参数的位置用`?`代替
* 注意英文问号，问号不要带引号
* 填入代替完毕后的sql语句进入`prepare`
* 预执行完毕后返回变量，对其`execute`即可，然后以`array`传入所有问号代替的参数，注意顺序正确，注意是对`$dat`执行，不需要传参请传一个空的`array()`
* 这样就不存在sql注入的问题了，因为已经“预执行过”了，所有传入参数都直接填入“值”中
* 注意：下一次要`prepare`，还是对着`$mysql`，所以**不能**用`$mysql=$mysql->prepare`，`$dat`只是个临时参数
* 执行完毕后如需取出数据
```
$res=$dat->fetchAll();
$res=$res[0];//只有一个数据或只需要取一个数据的话加上这句
```

## 获取相关sql指令简便方法
* 本教程使用`Adminer`，你要用`PHPMyAdmin`也可以，不过我比较懒`Adminer`只有一个文件（再加一个样式表）
* 先进行一次操作（包括筛选等操作，具体可自行`Adminer`功能），确定执行后可以看到有个**SQL**命令，点进去即可，可以直接复制文本，也可以点进去编辑复制
* 复制完成后可根据自行需要修改指令
* ![SQLSELECT](../img/program/sql_select.png "SQLSELECT")
* ![SQLGET](../img/program/sql_get.png "SQLGET")

## SQL注入
* 所谓SQL注入，就是通过把SQL命令插入到Web表单提交或使用其他方式替代原有字符串提交给服务器，最终达到欺骗服务器执行恶意的SQL命令。
* 防止SQL注入，我们需要注意以下几个要点：
    * 1.永远不要信任用户的输入。对用户的输入进行校验，可以通过正则表达式，或限制长度；对单引号和 双"-"进行转换等。
    * 2.永远不要使用动态拼装sql，可以使用参数化的sql或者直接使用存储过程进行数据查询存取。
    * 3.永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
    * 4.不要把机密信息直接存放，加密或者`hash`掉密码和敏感的信息。
    * 5.应用的异常信息应该给出尽可能少的提示，最好使用自定义的错误信息对原始错误信息进行包装
    * 6.sql注入的检测方法一般采取辅助软件或网站平台来检测，软件一般采用sql注入检测工具jsky，网站平台就有亿思网站安全平台检测工具。`MDCSOFT SCAN`等。采用`MDCSOFT-IPS`可以有效的防御SQL注入，XSS攻击等。
* 以上比较烦，需要详细可以自己了解，使用`prepare`就完事了
* 基本原理就是：闭合前面已有的指令，插入指令，屏蔽后面指令
```js
//原语句
"select * from `user` where `username`='".USER."' and `pwd`='".PWD."'"
//如果用户名传入   ';select * from `user` --
//那么执行的语句就变成了
select * from `user` where `username`='';select * from `user` --' and `pwd`='233'
//分开了解析
select * from `user` where `username`=''; //查不出东西
select * from `user`  //查所有数据
--' and `pwd`='233'   //--屏蔽了后面内容
//所以返回了所有的用户数据
```

## 危险操作
* drop (删除表)：删除内容和定义，释放空间。简单来说就是**把整个表去掉**.以后要新增数据是不可能的,除非新增一个表。
    * drop语句将删除表的结构被依赖的约束（constrain),触发器（trigger)索引（index);依赖于该表的存储过程/函数将被保留，但其状态会变为：invalid。
    * 也可以删除数据库
* truncate (清空表中的数据)：删除内容、释放空间但不删除定义(**保留表的数据结构**)。与drop不同的是,只是清空表数据而已。
    * 注意:truncate 不能删除行数据,要删就要把表清空。
* delete (删除表中的数据)：delete 语句用于**删除表中的行**。delete语句执行删除的过程是每次从表中删除一行，并且同时将该行的删除操作作为事务记录在日志中保存，以便进行进行回滚操作。
* 执行速度，一般来说: drop> truncate > delete。

* Linux中`rm -rf * `删除当前目录下所有文件


















