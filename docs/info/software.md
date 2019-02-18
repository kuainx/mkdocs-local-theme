# 一些软件
## FFMPEG
* 官方网站：<http://ffmpeg.org/>
* 注意：
    * 不要下载源码  
    * 只需要ffmpeg.exe起作用
* 不想下载/找不到下载地？
    * 在JJdown Client（./OrderEXE） / m3u8批量下载器(根目录) 中有

### 正常操作（推荐）
* 将ffmpeg.exe和文件一起放到一个文件夹中（防止找不到）
* 改个方便打的名字（如果名字有空格，在两边用英文双引号括起来，如”233 666 8888.mp3”）
![ffmpeg](../img/info/ffmpeg.png "ffmpeg")

### 命令表
* 更多命令请百度，mp4可换成mp3，关键参数已斜体，00:00:00=时分秒：
* <http://demo.ekuai.tech/ffmpeg>
* 命令输入：在当前目录打开命令窗口（Win10如何有该选项看基本操作）

!!!warning "警告"
    * 转码之中除非要终止，不要按键盘，讲不准就按到了某个查看详细信息的按钮
    * 查看详细信息会慢到你想砸电脑
    * 如果不慎按到了，还是重来吧
<pre><code>
编码转换
ffmpeg -i ***input.flv*** ***output.mp4***
视频截取
ffmpeg -ss ***00:10:00*** -t ***00:15:00*** -accurate_seek -i ***input.mp4*** -codec copy ***output.mp4***
视频合成
ffmpeg -i "concat:***input1.mp4***|***input2.mp4***|***input3.mp4***" -c copy ***output.mp4***
视频属性查看
ffmpeg -i ***input.mp4***
抽取音频
ffmpeg -i ***input.mp4*** -vn -y -acodec copy ***output.aac***
抽取视频
ffmpeg -i ***input.mp4*** -vcodec copy –an ***output.mp4***
音视频合成
ffmpeg -i ***input.mp4*** -i ***input.mp3*** -vcodec copy -acodec copy ***output.mp4***
</code></pre>

### 真·操作示例
#### 视频属性查看
* 导出注意格式（aac和mp3可以导出后转码（上方有命令））
    ![info](../img/info/info.png "info")

#### 文件覆盖
* 如果输出文件存在，会报以下内容，输入y覆盖，输入n终止
    ![cover](../img/info/cover.png "cover")

## PhotoZoom
### 基本操作
* 一款图片放大<del>（马赛克处理）</del>软件，拖入图片，左上角调整图片大小，左下角调整放大算法
![PhotoZoom](../img/info/photozoom.png "PhotoZoom")

### 批量操作
* 先导入图片（推荐长宽比相同），全选，修改预设或配置，运行
![PhotoZoom](../img/info/photozoom_more.png "PhotoZoom")

### 推荐配置
* 普通处理（不管放大缩小），都可以选择**缩减尺寸**预设
* 根据其他的需求也可自行修改观察效果



