# RUNMUN 润梦（网页） 专题
## 说在前面
* 这里仅限润梦的网页专题
* 一下内容仅限润梦的网页中

!!!warning "模板"
    * 学会使用模板，这可以节约大量时间
    * 想不起来的尽快百度，避免想着想着就忘了<c>就是我</c>
    * 尽早完成，总是没错的
    * 不要造轮子（Reinvent the Wheel），但是必要的创新还是需要的

## 重点说明
### 正式报名须知
* 所有须知中不要出现**最终解释权**或相似文本，如果有请**删除**，没有也别加

## 分类
### 主页（Index）
* 就是首页

### PDF页面（PDFViewer）
* 即：在网页上显示PDF页面
* 包括：邀请函、主席招募、通告等
* 单纯从服务器获取数据进行展示使用该页面

### 嵌入页面（Iframe）
* 即：在网页上嵌入外部（或内部）的其他网页
* 包括：预报名表、主席团报名、会场意向、地图等
* 需要提交数据至服务器的使用该页面

### 手写页面（···）
* 即：自己写的自定义页面
* 包括：正式报名表
* 需要高度自定义的数据提交使用该页面
* 严格说主页也算是手写页面，不过相对较简单（至少没多少js）

!!!warning "警告"
    * 该页面书写高度费时费脑
    * 预留出足够时间
    * 推荐使用各类框架
    * **多找几个人看看，设计是否合适**

### htaccess（重定向）
* Htaccess并不算页面
* 但是这里把他列出来表明了这个书写还是需要的
* 具体语法请见htaccess专业，这里仅列出了需要改的

### 难度排列
* PDF页面 = 嵌入页面 (松鼠级) < 主页 (普通级) < htaccess（理解级） < 手写页面 (大佬级)

## 模板概述
* RUNMUN 官方网站大部分页面使用[AmazeUI](http://amazeui.org/)（正式报名内页及Explorer除外）

### 样式表
* 模板数据（JS/CSS）包括以下内容
    ```html
    @@ head
    <link rel="stylesheet" href="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/css/amazeui.flat.min.css" />
    @@
    
    @@ body 末尾
    <script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/jquery.min.js"></script>
    <script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/amazeui.min.js"></script>
    @@
    ```
* css样式放置于页头，js放置于末尾保证加载的速度和完整性

### ICON图标
* 源代码
```html
<span class="am-icon-qq"> QQ</span>
```
* [IconList](http://amazeui.org/css/icon)
* 替换class内容即可

## Q&A
### 为什么需要使用网页？
* 你也可以不用

### 为什么都是php
* 涉及到网页缓存，HTML，css，js等静态文件，服务器会进行缓存
* 缓存后在服务端更改后需要一段时间进行更新（通常是24h）
* 而强制更新需要在控制台更新缓存，这个操作比较麻烦，而且比较没用
* php由于是动态页面，不进行设置一般是不会缓存的

## 页面概述(HEAD)
### 访问时间限制
* 源代码
```php
<?php if(time()>1534348799 && (empty($_GET['scrf']) || ($_GET['scrf']!="yjRMpqCf" && $_GET['scrf']!="56ade73"))){header('location: ./404');exit;} ?>
```
* 在某时间前可以访问（即：某时间后跳转至404页面）
```
time()>1534348799
```
* 在用用某密码访问时间不受限（即：传入参数scrf为`yjRMpqCf`或`56ade73`可以不受限访问）
```
(empty($_GET['scrf']) || ($_GET['scrf']!="yjRMpqCf" && $_GET['scrf']!="56ade73"))
```
* 实际应用：
    * 只限制访问时间
    ```php
    <?php if(time()>1534348799){header('location: ./404');exit;} ?>
    ```
    * 只限制访问密码
    ```php
    <?php if(empty($_GET['scrf']) || ($_GET['scrf']!="aaa")){header('location: ./404');exit;} ?>
    ```
    * 多个密码向后追加，注意括号符匹配和&&位置
    ```php
    <?php if(empty($_GET['scrf']) || ($_GET['scrf']!="aaa")){header('location: ./404');exit;} ?>
    <?php if(empty($_GET['scrf']) || ($_GET['scrf']!="aaa" && $_GET['scrf']!="bbb")){header('location: ./404');exit;} ?>
    ```
* 在不需要限制访问的时候可以删除（整行删除）

### 不需要改的内容
* 源代码
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Content-Language" contect="zh-CN" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="format-detection" content="telephone=no" />
<meta name="renderer" content="webkit" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta name="Robots" contect= "all" />
<meta name="baiduspider" content="all" />
```

* 由上至下内容
    * 标识页面编码`UTF-8`
    * 标识页面语言`zh-CN`
    * 标识IE浏览器解析方式
    * 标志移动端优先的解析格式
    * 不将页面中长串数字解析为电话号码
    * 标识渲染器解析为`webkit`
    * 标识禁止网页进行转码<c>百度广告转码</c>
    * 标识允许机器人对页面进行抓取
    * 标识允许百度蜘蛛机器人对页面进行抓取

### 页面标题
* 源代码
```html
<title>第二轮通告 - 润梦 RUNMUN 中学生模拟联合国大会</title>
```

* 标识页面显示在标题栏和状态栏的标题名称

### 其他机器人抓取相关属性
* 源代码
```html
<meta name="KEYWords" contect="润梦,runmun,RUNMUN,模联,模拟联合国,上师大附中,上海师范大学附属中学,第二轮通告" />
<meta name="DEscription" contect="润梦 RUNMUN 中学生模拟联合国大会" />
<meta name="Author" contect="2018 润梦 RUNMUN 中学生模拟联合国大会组委 多媒体团队 - KUAI" />
<meta name="copyright" content="CopyRight © 2018 润梦 RUNMUN 中学生模拟联合国大会组委 多媒体团队 All Rights reserved" />
```

* 由上至下
    * 关键词
    * 网页描述
    * 作者
    * 版权

## PDF页面
### 修改PDF源文件
* 源代码
```js
@@ 行 24
var url = 'https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/2018%20%E6%B6%A6%E6%A2%A6%20RUNMUN%20%E4%B8%AD%E5%AD%A6%E7%94%9F%E6%A8%A1%E6%8B%9F%E8%81%94%E5%90%88%E5%9B%BD%E5%A4%A7%E4%BC%9A%20%E7%AC%AC%E4%BA%8C%E8%BD%AE%E9%80%9A%E5%91%8A.pdf';
@@
```
* 输入PDF源文件的地址（注意进行转码，直接在进行COS控制台进行复制即可）

### 标题栏高亮
* 源代码
```php
@@ 行 102
<?php echo file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/head.php?t=6')?>
@@
```
* `t=6`：页面导航栏中高亮的项目，如没有则直接`head.php`即可

## 嵌入页面
### 标题栏高亮
* 源代码
```php
@@ 行 32
<?php echo file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/head.php')?>
@@
```
* `t=6`：页面导航栏中高亮的项目，如没有则直接`head.php`即可

### 外部页面URL修改
* 源代码
```html
@@ 行 33
<iframe id="frame" allowTransparency="true" style="width:100%;height:100%;border:none;overflow:auto;" frameborder="0" src="http://runmun2018.mikecrm.com/e0owGIF"></iframe>
@@
```
* `src="http://runmun2018.mikecrm.com/e0owGIF"` ：标识外源页面的URL

## 主页

!!!warning "在阅读此项之前，请确保你有以下知识"
    * MySQL数据库（基础）
    * SQL语言（基础）
    * HTML、PHP、JS

!!!tip "OldVer"
    * 润梦网页已经进行了一次改版<c><del>虽然之前之后看上去没有什么区别就是了</del></c>
    * 改版前页面进行了存档于`index_old_20180923.php`
    * 其中信息发布的获取方式由直接文本改为了数据库进行获取

* 默认页面：`index.php`
 
### 信息发布
* 源代码
```mysql
@@ 数据表 msg
```
* 按照已有数据进行修改即可，可以复制或下载一个表进行保存数据
* 其他固定数据修改需修改js代码，如下
    ```js hl_lines="11 13"
    @@ 行 40
    function getMsg(){
        var container=document.getElementById('accordion');
        var btn=document.getElementById('info-btn');
        btn.className="am-icon-btn am-secondary am-icon-refresh am-icon-spin";
        container.innerHTML='<div class="am-progress am-progress-striped am-active " id="load-prog-container" style="position: absolute;height: 30px;width: 50%;margin: auto;left: 24.5%;top: 50%;"><div class="am-progress-bar am-progress-bar-secondary" id="load-prog" style="width:100%;">加载中...请稍后</div></div>';
        $.get("/get/msg", function(result){
            var res='';
            var len=result.ret.length;
            result.ret.forEach(function(e){
                let res1='<div class="am-panel am-panel-primary"><div class="am-panel-hd"  data-am-collapse="{parent: \'#accordion\', target: \'#C-'+e.id+'\'}"><div class="am-g"><div class="am-u-sm-8">润梦 RUNMUN 2018 模拟联合国大会 '+e.title+'</div><div class="am-u-sm-4">'+e.time+'</div></div></div><div id="C-'+e.id+'" class="am-panel-collapse am-collapse '
                e.id==len && (res1+='am-in');
                res=res1+'"><div class="am-panel-bd"><article class="am-article"><div class="am-article-hd"><h3 class="am-article-title">润梦 RUNMUN 2018 模拟联合国大会 '+e.title+'</h3><p class="am-article-meta">'+e.time+'</p></div><div class="am-article-bd">'+e.inner+'</div></article></div></div></div>'+res;
            });
            container.innerHTML=res;
            btn.className="am-icon-btn am-secondary am-icon-refresh";
        });
    }
    @@
    ```
* 修改相应位置的文本即可，经过测试前不推荐修改标签

### 相关文件（Related Documents）
* 源代码
    ```html hl_lines="4 5"
    @@ 行 74
    <div class="am-u-lg-4 am-u-md-6 am-u-sm-12 detail-mb">
      <h3 class="detail-h3">
        <a href="./invitation"><i class="am-icon-file-pdf-o am-icon-lg"></i>
        RUNMUN 2018 邀请函</a>
      </h3>
    </div>
    @@
    ```
* 修改连接：`<a href="./invitation">`
* 修改图标：`<i class="am-icon-file-pdf-o am-icon-lg"></i>`
* 往后追加即可，注意`div`标签的嵌套
    
### 联系我们（Contact Us）
* 源代码
```html hl_lines="6 10 12"
@@ 行 196
<div class="contact">
  <div class="am-g am-container">
      <h2>联系我们<span class="title-s">Contact Us</span></h2>
    <div class="am-u-lg-4 am-u-md-6 am-u-sm-12 hope-img">
      <a href="https://jq.qq.com/?_wv=1027&k=5ZR1BUB" target="_blank"><img src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/%E4%BC%9A%E5%89%8D200.png" width="200px" data-am-scrollspy="{animation:'slide-left', repeat: false}"></a>
      <hr class="am-article-divider am-show-sm-only hope-hr">
    </div>
    <div class="am-u-lg-8 am-u-md-6 am-u-sm-12">
      <h3>润梦 RUNMUN 2018 中学生模拟联合国大会 组委</h3>
        <div class="am-g doc-am-g">
          扫描二维码或点击二维码加入<br/>【润梦 RUNMUN 2018 会前交流群】
        </div>
    </div>
  </div>
</div>
@@
```
* 修改加群链接：`<a href="https://jq.qq.com/?_wv=1027&k=5ZR1BUB" target="_blank">`
* 修改二维码图片（注意URL转码）：`<img src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/%E4%BC%9A%E5%89%8D200.png" width="200px" data-am-scrollspy="{animation:'slide-left', repeat: false}">`

## 其他纯文本修改
* 修改纯文本即可，不推荐未测试之前修改标签

## 标题头（HEAD）
* 默认文件：`head.php`
* 所有可见文件的标题导航栏都是从这里获取的
* 源代码
```html
@@ 行 13
<li class="<?php if($_GET['t']==1){echo 'am-active';}?>"><a href="./">首页</a></li>
@@
```
* 修改标题标号`$_GET['t']==1`推荐依次排序
* 注：此标号与顺序无关，只与其他页面链接进来时`t=1`有关，为几就高亮标号几

## 页尾（FOOT）
* 默认文件：`foot.php`
* 所有可见文件的页尾都是从这里获取的，并同时兼顾以下内容
    * PDF文件丢失或其他，显示页面找不到
    * 百度链接摘要显示版权及网页信息
    * 接入百度统计代码
    * 接入百度推送代码
    * 加入Console控制台面板版权代码
* 修改纯文本即可

## htaccess（重定向）

!!!warning "提示"
    * 在阅读此项之前，请确保你有一下知识
        * HTML（极简）
        * 正则表达式（基础）
* 页面重定向，改/使用代码**非常简单**，注重理解，你也可以不理解，直接改了能用就完事了
* 源代码
```js
RewriteEngine On

RewriteCond %{REQUEST_URI} ^/freg/?$
RewriteRule ^(.*)$ freg.php [L]
```
* 从上至下说明
    * 开启重写引擎
    * 匹配请求目录
    * 重定向至文件
* 食用方法
    * 目录匹配正则表达式`^/freg/?$`
    * 重定向文件直接改`freg.php`直接定位于根目录
* 正则表达式请见正则表达式篇
* 详细理解请见htaccess篇











