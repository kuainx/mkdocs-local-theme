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
* 部分限定指令（Where，Like，=等）
* php执行相关查询指令
* 获取相应sql语句的简便方法
* 防止sql注入的代码编写（**重要**）
* sql数据库软件的使用方法
* 了解一些危险的指令和操作<c>MySQL从删库到跑路</c>

### SQL注意事项
* SQL 对大小写不敏感
* 某些数据库系统要求在每条 SQL 命令的末端使用分号。在我们的教程中不使用分号。
* 分号是在数据库系统中分隔每条 SQL 语句的标准方法，这样就可以在对服务器的相同请求中执行一条以上的语句。

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

* **提示：**星号（*）是选取所有列的快捷方式。
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

* INSERT INTO 语句用于向表格中插入新的行。
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

Update 语句用于修改表中的数据。

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

* DELETE 语句用于删除表中的行。
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













