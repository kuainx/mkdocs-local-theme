# Mkdocs
## 关于
* 本文档的撰写软件
* markdown to static HTML site
* [Origin](https://www.mkdocs.org/)

!!!warning "警告"
    * [Mkdocs中文文档](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/)并非最新版本，可能出现差错（严重错误）


## 局域网访问
* `:::js mkdocs serve`命令会默认监听localhost(127.0.0.1:8000)
* 如此在局域网就无法访问（Eg:局域网IP：192.168.1.100）
* 进行修改：将默认IP改为0.0.0.0:8000（监听本地所有ip）
* ![MkdocsPort](../../img/about/mkdocs_port.png)
* 该文件一般位于:`:::js %USERPROFILE%\AppData\Local\Programs\Python\Python37\Lib\site-packages\mkdocs\config`




