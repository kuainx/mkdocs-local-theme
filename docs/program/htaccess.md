# Htaccss重定向
## 说在前面
* 在阅读此项之前你应该了解
    * 正则表达式
    * 服务器（基础）
* Htaccsss文件的作用：一般是伪静态，还有：文件夹密码保护、用户自定义重定向、自定义404页面、禁止特定IP地址的用户、只允许特定IP地址的用户、禁止目录列表，等等
* Apache用的htaccess：<https://www.cnblogs.com/itshark/p/5849750.html>
* 一般虚机用的是Nginx，需要改一部分数据

!!!quote "伪静态"
    * 即：URL看起来是静态页面，但是实际上是动态页面，通常便于搜索引擎进行抓取
        * 但是会增加一些服务器负担，所以通常会设置游客（搜索引擎抓取没有登陆，自然也算游客）访问使用伪静态，注册用户不使用
        * 详细解释：伪静态是相对真实静态来讲的，通常我们为了增强搜索引擎的友好面，都将文章内容生成静态页面，但是有的朋友为了实时的显示一些信息。或者还想运用动态脚本解决一些问题。不能用静态的方式来展示网站内容。但是这就损失了对搜索引擎的友好面。怎么样在两者之间找个中间方法呢，这就产生了伪静态技术。就是展示出来的是以html一类的静态页面形式，但其实是用ASP一类的动态脚本来处理的。

## 具体示例

```
RewriteEngine On
RewiteBase /
RewriteCond %{REQUEST_URI} ^/freg/?$
RewriteRule ^(.*)$ freg.php [L]
```

* RewriteEngine On/Off
* 开启/关闭重写引擎
* RewiteBase /
* 重定向根目录（不写也可以，默认为/）
* RewriteCond %{REQUEST_URI} ^/freg/?$
* 重定向匹配，从`REQUEST_URI`中匹配正则表达式
* RewriteRule ^(.*)$ freg.php [L]
* 重定向至`freg.php`，并结束匹配

```
RewriteCond %{SERVER_PORT} 80
RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R]
```
* HTTP重定向至HTTPS

## 使用方法
* 直接写纯文本，命名为`.htaccess`文件放根目录即可，可先试验一下是否支持重定向，一般都是支持的

## 匹配数据
* 基本同php的`$_SERVER`
* 常用的有：`HTTP_HOST`、`REQUEST_URI`、`SERVER_PORT`

```
HTTP_USER_AGENT                  //主要用于检测访问者系统和浏览器等
HTTP_REFERER                     //从哪个页面链接过来 
HTTP_COOKIE
HTTP_FORWARDED
HTTP_HOST                        //域名
HTTP_PROXY_CONNECTION
HTTP_ACCEPT                      
REMOTE_ADDR
REMOTE_HOST
REMOTE_USER
REMOTE_IDENT
REQUEST_METHOD
SCRIPT_FILENAME
PATH_INFO
QUERY_STRING
AUTH_TYPE
DOCUMENT_ROOT
SERVER_ADMIN
SERVER_NAME
SERVER_ADDR
SERVER_PORT
SERVER_PROTOCOL
SERVER_SOFTWARE
TIME_YEAR
TIME_MON
TIME_DAY
TIME_HOUR
TIME_MIN
TIME_SEC
TIME_WDAY
TIME
API_VERSION                      //这是正在使用的httpd中(服务器和模块之间内部接口)的Apache模块API的版本， 其定义位于include/ap_mmn.h中。此模块版本对应于正在使用的Apache的版本 (比如，在Apache 1.3.14的发行版中，这个值是19990320:10)。 通常，对它感兴趣的是模块的作者。
THE_REQUEST                      //这是由浏览器发送给服务器的完整的HTTP请求行。(比如, “GET /index.html HTTP/1.1″). 它不包含任何浏览器发送的附加头信息。
REQUEST_URI                      //这是在HTTP请求行中所请求的资源。
REQUEST_FILENAME                 //这是与请求相匹配的完整的本地文件系统的文件路径名或描述.
IS_SUBREQ                        //如果正在处理的请求是一个子请求，它包含字符串”true”，否则就是”false”。 模块为了解析URI中的附加文件，有可能会产生子请求。
```



## 追加标记
* 常用： R，L

| RewriteRule标记 | 含 义       | 描 述                                                 |
| --------------- | ----------- | ----------------------------------------------------- |
| R               | Redirect    | 发出一个HTTP重定向                                    |
| F               | Forbidden   | 禁止对URL地址的存取                                   |
| G               | Gone        | 标记URL地址不存在                                     |
| P               | Proxy       | 将URL地址传递给mod_proxy                              |
| L               | Last        | 停止处理接下来的规则                                  |
| N               | Next        | 再次重第一个规则开始处理，但是使用当前重写后的URL地址 |
| C               | Chain       | 将当前的规则和紧随其后的规则链接起来                  |
| T               | Type        | 强制执行指明的MIME类                                  |
| NS              | Nosubreq    | 只在没有任何内部子请求执行时运行本脚本                |
| NC              | Nocase      | URL地址匹配对大小写不敏感                             |
| QSA             | Qsappend    | 在新的URL地址后附加查询字符串部分，而不是替代         |
| PT              | Passthrough | 将重写后的URL地址传递给另一个Apache模块进行进一步处理 |
| S               | Skip        | 忽略之后的规则                                        |
| E               | Env         | 设置环境变量                                          |







