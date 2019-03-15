# RUNMUN 润梦（网页） 专题
## 说在前面
* 这里仅限润梦的网页专题
* 一下内容仅限润梦的网页中

!!!warning "模板"
    * 学会使用模板，这可以节约大量时间
    * 想不起来的尽快百度，避免想着想着就忘了<c>就是我</c>
    * 尽早完成，总是没错的
    * 不要造轮子（Reinvent the Wheel），但是必要的创新还是需要的

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

### 难度排列
* PDF页面 = 嵌入页面 (松鼠级) < 主页 (普通级) < 手写页面 (大佬级)

## Q&A
### 为什么需要使用网页？
* 你也可以不用

### 为什么都是php
* 涉及到网页缓存，HTML，css，js等静态文件，服务器会进行缓存
* 缓存后在服务端更改后需要一段时间进行更新（通常是24h）
* 而强制更新需要在控制台更新缓存，这个操作比较麻烦，而且比较没用
* php由于是动态页面，不进行设置一般是不会缓存的

## 页面概述
```php
<?php if(time()>1534348799 && (empty($_GET['scrf']) || ($_GET['scrf']!="yjRMpqCf" && $_GET['scrf']!="56ade73"))){header('location: ./404');exit;} ?>
```



## PDF页面
```html
<?php if(time()>1534348799 && (empty($_GET['scrf']) || ($_GET['scrf']!="yjRMpqCf" && $_GET['scrf']!="56ade73"))){header('location: ./404');exit;} ?>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Content-Language" contect="zh-CN" />
    <title>主席团报名 - 润梦 RUNMUN 中学生模拟联合国大会</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="Robots" contect= "all" />
    <meta name="baiduspider" content="all" />
    <meta name="KEYWords" contect="润梦,runmun,RUNMUN,模联,模拟联合国,上师大附中,上海师范大学附属中学,主席团招募,主席招募表" />
    <meta name="DEscription" contect="润梦 RUNMUN 中学生模拟联合国大会" />
    <meta name="Author" contect="2018 润梦 RUNMUN 中学生模拟联合国大会组委 多媒体团队 - KUAI" />
    <meta name="copyright" content="CopyRight © 2018 润梦 RUNMUN 中学生模拟联合国大会组委 多媒体团队 All Rights reserved" />
    <link rel="stylesheet" href="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/css/amazeui.flat.min.css" />
        <style>
            html,body{height:100%;overflow:hidden;}
            *{margin:0;padding:0;}
        </style>
        
    </head>
    
    <body>
    <?php echo file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/head.php?t=5')?>
        <iframe id="frame" allowTransparency="true" style="width:100%;height:100%;border:none;overflow:auto;" frameborder="0" src="http://runmun2018.mikecrm.com/CQoy0SB"></iframe>
    </body>
    <script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/jquery.min.js"></script>
    <script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/amazeui.min.js"></script>
<?php echo file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/foot.php')?>
</html>
```



















