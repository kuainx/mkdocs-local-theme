# CSS
## 说在前面
* 在继续学习之前，你需要对下面的知识有基本的了解：
    * HTML

## 关于CSS
* CSS 指层叠样式表 (Cascading Style Sheets)
* 样式定义如何显示 HTML 元素
* 样式通常存储在样式表中
* 外部样式表可以极大提高工作效率
* 外部样式表通常存储在 CSS 文件中

### 为什么需要CSS
* HTML 标签原本被设计为用于定义文档内容。通过使用 `<h1>`、`<p>`、`<table>` 这样的标签，HTML 的初衷是表达“这是标题”、“这是段落”、“这是表格”之类的信息。同时文档布局由浏览器来完成，而不使用任何的格式化标签。
* 由于两种主要的浏览器（Netscape 和 Internet Explorer）不断地将新的 HTML 标签和属性（比如字体标签和颜色属性）添加到 HTML 规范中，创建文档内容清晰地独立于文档表现层的站点变得越来越困难。
* 为了解决这个问题，万维网联盟（W3C）在 HTML 4.0 之外创造出样式（Style）。
* 所有的主流浏览器均支持层叠样式表。

## 样式覆盖
* 一般而言，所有的样式会根据下面的规则层叠于一个新的虚拟样式表中，其中数字 4 拥有最高的优先权。
    1. 浏览器缺省设置
    2. 外部样式表
    3. 内部样式表（位于 `<head>` 标签内部）
    4. 内联样式（在 HTML 元素内部）
* 因此，内联样式（在 HTML 元素内部）拥有最高的优先权，这意味着它将优先于以下的样式声明：`<head>` 标签中的样式声明，外部样式表中的样式声明，或者浏览器中的样式声明（缺省值）。

## CSS语法
## CSS语法规则
* CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明。
```css
selector {declaration1; declaration2; ... declarationN }
```
* 选择器通常是您需要改变样式的 HTML 元素。
* 每条声明由一个属性和一个值组成。
* 属性（property）是您希望设置的样式属性（style attribute）。每个属性有一个值。属性和值被冒号分开。
```css
selector {property: value}
```
* 下面这行代码的作用是将 h1 元素内的文字颜色定义为红色，同时将字体大小设置为 14 像素。
* 在这个例子中，h1 是选择器，color 和 font-size 是属性，red 和 14px 是值。
```css
h1 {color:red; font-size:14px;}
```
* 我们也对其进行格式化操作
```css
h1 {
    color: red;
    font-size: 14px;
}
```

!!!warning "提示"
    * 请使用花括号来包围声明。

### 值的不同写法和单位
* 除了英文单词 red，我们还可以使用十六进制的颜色值 #ff0000：
```css
p { color: #ff0000; }
```
* 我们还可以通过两种方法使用 RGB 值：
```css
p { color: rgb(255,0,0); }
p { color: rgb(100%,0%,0%); }
```
* 请注意，当使用 RGB 百分比时，即使当值为 0 时也要写百分比符号。但是在其他的情况下就不需要这么做了。比如说，当尺寸为 0 像素时，0 之后不需要使用 px 单位，因为 0 就是 0，无论单位是什么。
* 我们还有一种RGBA格式（其实更加常用）该值除了规定颜色外，还添加了一个透明（Alpha）通道(0透明-1不透明)
```css
p { background-color:rgba(255,0,0,.5); }
```

!!!note ".x"
    * 在很多语言（规范）之中，小数点前0可以不写，如.2即代表了0.2
    * 比如js，css等，你甚至在Word输入边距等数值也可以打.2，会自动补全

### 加引号
* **提示：**如果值为若干单词（或空格），则要给值加引号：
```css
p {font-family: "sans serif";}
```

### 多重声明
* **提示：**如果要定义不止一个声明，则需要用分号将每个声明分开。最后一条规则是不需要加分号的，因为分号在英语中是一个分隔符号，不是结束符号。然而，大多数有经验的设计师会在每条声明的末尾都加上分号，这么做的好处是，当你从现有的规则中增减声明时，会尽可能地减少出错的可能性。就像这样：
```css
p {text-align:center; color:red;}	
```

### 空格和大小写
* 大多数样式表包含不止一条规则，而大多数规则包含不止一个声明。多重声明和空格的使用使得样式表更容易被编辑：
```css
body {
  color: #000;
  background: #fff;
  margin: 0;
  padding: 0;
  font-family: Georgia, Palatino, serif;
  }
```
* 是否包含空格不会影响 CSS 在浏览器的工作效果，CSS 对大小写不敏感。**但 class 和 id 名称对大小写是敏感的**。

### 压缩和换行
* CSS不区分换行，为了节约位置，我们有时会在发布时删除不必要的空格和换行，所以在应用主题时经常会看到`style.css`和`style.min.css`存在，其实两个文件效果是一样的，只是min文件进行了压缩（生产环境下使用），而原版则便于进行修改或学习（源代码）


## CSS嵌入HTML文档
### 直接在HTML页面书写（内部样式表）
```html
<head>
    <style>
        .btn{
            color:red;
        }
    <style>
</head>
```
* 注：在HTML页面书写可以再head或body标签中书写，不可写出界
* 直接置于HTML页面中，方便修改和避免缓存，测试时经常使用
* 由于文件大小缘故，我们一般将其放置于专门css文件中，进行引用，除非真的非常少，且只有一个页面使用

### 外链CSS文件(外部样式表)
* style.css文件中
```css
.btn{
    color:red;
}
```
* 单独置于文件中，不加css标签
* 链入文件中，使用link标签，在index.html文件中
```html
<link rel="stylesheet" type="text/css" href="style.css" />
```
* href即为样式表路径

### 标签样式（内联样式）
```css
<p style="color: sienna; margin-left: 20px">
This is a paragraph
</p>
```
* 请慎用这种方法，不适合大范围应用，应用在例如当样式仅需要在一个元素上应用一次时。

## CSS选择器
### 类选择器
```css
.important {color:red;}
```
* 即：选择class为important的元素，赋予属性

### id 选择器
```css
#red {color:red;}
```
* 即：选择id为red的元素，赋予属性

### 元素选择器
```css
h1 {color:blue;}
```
* 即：选择h1标签，赋予属性

## CSS样式
* [CSS样式列表](http://www.w3school.com.cn/cssref/index.asp)
* CSS样式可以在所有元素上使用，只是有些样式在有些元素上用没有用罢了

### CSS单位
* 以下列出所有单位表，其中，**px**，**%**，**em**是常用的

| 单位 | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| %    | 百分比                                                       |
| in   | 英寸                                                         |
| cm   | 厘米                                                         |
| mm   | 毫米                                                         |
| em   | 1em 等于当前的字体尺寸。2em 等于当前字体尺寸的两倍。例如，如果某元素以 12pt 显示，那么 2em 是24pt。在 CSS 中，em 是非常有用的单位，因为它可以自动适应用户所使用的字体。 |
| ex   | 一个 ex 是一个字体的 x-height。 (x-height 通常是字体尺寸的一半。) |
| pt   | 磅 (1 pt 等于 1/72 英寸)                                     |
| pc   | 12 点活字 (1 pc 等于 12 点)                                  |
| px   | 像素 (计算机屏幕上的一个点)                                  |

### CSS颜色
* 以下列出所有颜色表，其中，**颜色名**，**#rrggbb**，**rgba()**是常用的

| 单位（斜体为CSS3） | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| (颜色名)           | 颜色名称 (比如 red)                                          |
| rgb(x,x,x)         | RGB 值 (比如 rgb(255,0,0))                                   |
| rgb(x%, x%, x%)    | RGB 百分比值 (比如 rgb(100%,0%,0%))                          |
| #rrggbb            | 十六进制数 (比如 #ff0000)                                    |
| *rgba(x,x,x,x)*    | RGBA 颜色值：rgba(red, green, blue, alpha)，alpha 参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字。 |
| *hsl(x,x%,x%)*     | HSL 颜色值：hsl(hue, saturation, lightness)，Hue 是色盘上的度数（从 0 到 360） - 0 (或 360) 是红色，120 是绿色，240 是蓝色，Saturation 是百分比值；0% 意味着灰色，而 100% 是全彩。Lightness 同样是百分比值；0% 是黑色，100% 是白色。 |
| *hsla(x,x%,x%,x)*  | HSLA 颜色值：hsla(hue, saturation, lightness, alpha)，其中的 alpha 参数定义不透明度。alpha 参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字。 |

!!!tip "颜色的调试"
    * 我们可以很方便的在浏览器控制台中调节和观察颜色
    * 在浏览器控制台中调节到满意的颜色后再写入代码即可，这免于了修改和刷新的重复麻烦的劳动
    * 具体操作见浏览器控制台篇

### CSS的一些常用样式
#### width
* width 属性设置元素的宽度。
* 这个属性定义元素内容区的宽度。
* 行内非替换元素（直接显示文本内容的元素，如p）会忽略这个属性。

| 默认值：          | auto                        |
| ----------------- | --------------------------- |
| 继承性：          | no                          |
| 版本：            | CSS1                        |
| JavaScript 语法： | *object*.style.width="50px" |

* 可能的值

| 值       | 描述                                       |
| -------- | ------------------------------------------ |
| auto     | 默认值。浏览器可计算出实际的宽度。         |
| *length* | 使用 px、cm 等单位定义宽度。               |
| *%*      | 定义基于包含块（父元素）宽度的百分比宽度。 |
| inherit  | 规定应该从父元素继承 width 属性的值。      |

#### height
* height 属性设置元素的高度。
* 这个属性定义元素内容区的高度。
* 行内非替换元素会忽略这个属性。

| 默认值：          | auto                         |
| ----------------- | ---------------------------- |
| 继承性：          | no                           |
| 版本：            | CSS1                         |
| JavaScript 语法： | *object*.style.height="50px" |

* 可能的值

| 值       | 描述                                   |
| -------- | -------------------------------------- |
| auto     | 默认。浏览器会计算出实际的高度。       |
| *length* | 使用 px、cm 等单位定义高度。           |
| *%*      | 基于包含它的块级对象的百分比高度。     |
| inherit  | 规定应该从父元素继承 height 属性的值。 |

#### color
* color 属性规定文本的颜色。
* 这个属性设置了一个元素的前景色（在 HTML 表现中，就是元素文本的颜色）；光栅图像不受 color 影响。这个颜色还会应用到元素的所有边框，除非被 border-color 或另外某个边框颜色属性覆盖。
* 要设置一个元素的前景色，最容易的方法是使用 color 属性。

| 默认值：          | *not specified*                |
| ----------------- | ------------------------------ |
| 继承性：          | yes                            |
| 版本：            | CSS1                           |
| JavaScript 语法： | *object*.style.color="#FF0000" |

!!!tip "提示"
    * 请使用合理的背景颜色和文本颜色搭配，这样可以提高文本的可读性。

* 可能的值

| 值           | 描述                                               |
| ------------ | -------------------------------------------------- |
| *color*      | 规定颜色。           |
| inherit      | 规定应该从父元素继承颜色。                         |

#### font
* 这是一个**集合属性**，我们一般将其分开来写
* font 简写属性在一个声明中设置所有字体属性。
* **注释：**此属性也有第六个值："line-height"，可设置行间距。
* 这个简写属性用于一次设置元素字体的两个或更多方面。使用 icon 等关键字可以适当地设置元素的字体，使之与用户计算机环境中的某个方面一致。注意，如果没有使用这些关键词，至少要指定字体大小和字体系列。
* 可以按顺序设置如下属性：
    * font-style
    * font-variant
    * font-weight
    * font-size/line-height
    * font-family
* 可以不设置其中的某个值，比如 font:100% verdana; 也是允许的。未设置的属性会使用其默认值。

| 默认值：          | *not specified*                                              |
| ----------------- | ------------------------------------------------------------ |
| 继承性：          | yes                                                          |
| 版本：            | CSS1                                                         |
| JavaScript 语法： | *object*.style.font="italic small-caps bold 12px arial,sans-serif" |

* 可能的值

| 值                      | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| *font-style*            | 规定字体样式。参阅：[font-style](http://www.w3school.com.cn/cssref/pr_font_font-style.asp) 中可能的值。 |
| *font-variant*          | 规定字体异体。参阅：[font-variant](http://www.w3school.com.cn/cssref/pr_font_font-variant.asp) 中可能的值。 |
| *font-weight*           | 规定字体粗细。参阅：[font-weight](http://www.w3school.com.cn/cssref/pr_font_weight.asp) 中可能的值。 |
| *font-size/line-height* | 规定字体尺寸和行高。参阅：[font-size](http://www.w3school.com.cn/cssref/pr_font_font-size.asp) 和 [line-height](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp) 中可能的值。 |
| *font-family*           | 规定字体系列。参阅：[font-family](http://www.w3school.com.cn/cssref/pr_font_font-family.asp) 中可能的值。 |

#### display
* display 属性规定元素应该生成的框的类型。
* 这个属性用于定义建立布局时元素生成的显示框类型，如果使用 display 不谨慎会很危险，因为可能违反 HTML 中已经定义的显示层次结构，请进行详细测试。
* 常用值为**none**，**block**，**inline**，**inline-block**，其他几乎不使用或用其他代替

| 默认值：          | inline                          |
| ----------------- | ------------------------------- |
| 继承性：          | no                              |
| 版本：            | CSS1                            |
| JavaScript 语法： | *object*.style.display="inline" |

* 可能的值

| 值                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| none               | 此元素不会被显示。                                           |
| block              | 此元素将显示为块级元素，此元素前后会带有换行符。             |
| inline             | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block       | 行内块元素。（CSS2.1 新增的值）                              |
| list-item          | 此元素会作为列表显示。                                       |
| run-in             | 此元素会根据上下文作为块级元素或内联元素显示。               |
| compact            | CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| marker             | CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| table              | 此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符。 |
| inline-table       | 此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。 |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 `<tbody>`）。       |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 `<thead>`）。       |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）。       |
| table-row          | 此元素会作为一个表格行显示（类似 `<tr>`）。                    |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）。    |
| table-column       | 此元素会作为一个单元格列显示（类似 `<col>`）                   |
| table-cell         | 此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）          |
| table-caption      | 此元素会作为一个表格标题显示（类似 `<caption>`）               |
| inherit            | 规定应该从父元素继承 display 属性的值。                      |

#### padding
* 这是一个**集合属性**，我们一般将其并起来写
* padding 简写属性在一个声明中设置所有内边距属性。
* 这个简写属性设置元素所有内边距的宽度，或者设置各边上内边距的宽度。行内非替换元素上设置的内边距不会影响行高计算；因此，如果一个元素既有内边距又有背景，从视觉上看可能会延伸到其他行，有可能还会与其他内容重叠。元素的背景会延伸穿过内边距。不允许指定负边距值。
* **注释：**不允许使用负值。
* 从上开始顺时针数边，上右下左

!!!note "复杂性提示"
    * 本条目相对复杂，将单开一章（HTML元素盒子）讲解

* 例子 1
    ```
    padding:10px 5px 15px 20px;
    ```
    * 上内边距是 10px
    * 右内边距是 5px
    * 下内边距是 15px
    * 左内边距是 20px
* 例子 2
    ```
    padding:10px 5px 15px;
    ```
    * 上内边距是 10px
    * 右内边距和左内边距是 5px
    * 下内边距是 15px
* 例子 3
    ```
    padding:10px 5px;
    ```
    * 上内边距和下内边距是 10px
    * 右内边距和左内边距是 5px
* 例子 4
    ```
    padding:10px;
    ```
    * 所有 4 个内边距都是 10px

| 默认值：          | 0                                 |
| ----------------- | --------------------------------- |
| 继承性：          | no                                |
| 版本：            | CSS1                              |
| JavaScript 语法： | *object*.style.padding="10px 5px" |

* 可能的值

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| auto     | 浏览器计算内边距。                                           |
| *length* | 规定以具体单位计的内边距值，比如像素、厘米等。默认值是 0px。 |
| *%*      | 规定基于父元素的宽度的百分比的内边距。                       |
| inherit  | 规定应该从父元素继承内边距。                                 |

#### margin
* 这是一个**集合属性**，我们一般将其并起来写
* margin 简写属性在一个声明中设置所有外边距属性。该属性可以有 1 到 4 个值。
* 这个简写属性设置一个元素所有外边距的宽度，或者设置各边上外边距的宽度。
* 允许指定负的外边距值，不过使用时要小心。
* **注释：**允许使用负值。
* * 从上开始顺时针数边，上右下左

!!!note "复杂性提示"
    * 本条目相对复杂，将单开一章（HTML元素盒子）讲解

* 例子 1
    ```
    margin:10px 5px 15px 20px;
    ```
    * 上外边距是 10px
    * 右外边距是 5px
    * 下外边距是 15px
    * 左外边距是 20px
* 例子 2
    ```
    margin:10px 5px 15px;
    ```
    * 上外边距是 10px
    * 右外边距和左外边距是 5px
    * 下外边距是 15px
* 例子 3
    ```
    margin:10px 5px;
    ```
    * 上外边距和下外边距是 10px
    * 右外边距和左外边距是 5px
* 例子 4
    ```
    margin:10px;
    ```
    * 所有 4 个外边距都是 10px

| 默认值：          | 0                                |
| ----------------- | -------------------------------- |
| 继承性：          | no                               |
| 版本：            | CSS1                             |
| JavaScript 语法： | *object*.style.margin="10px 5px" |

* 可能的值

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| auto     | 浏览器计算外边距。                                           |
| *length* | 规定以具体单位计的外边距值，比如像素、厘米等。默认值是 0px。 |
| *%*      | 规定基于父元素的宽度的百分比的外边距。                       |
| inherit  | 规定应该从父元素继承外边距。                                 |

#### border
* 这是一个**集合属性**，我们一般将其并起来写
* border 简写属性在一个声明设置所有的边框属性。
* 可以按顺序设置如下属性：
    * border-width
    * border-style
    * border-color
* 如果不设置其中的某个值，也不会出问题，比如 border:solid #ff0000; 也是允许的。

| 默认值：          | *not specified*                        |
| ----------------- | -------------------------------------- |
| 继承性：          | no                                     |
| 版本：            | CSS1                                   |
| JavaScript 语法： | *object*.style.border="3px solid blue" |

* 可能的值

| 值             | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| *border-width* | 规定边框的宽度。参阅：[border-width](http://www.w3school.com.cn/cssref/pr_border-width.asp) 中可能的值。 |
| *border-style* | 规定边框的样式。参阅：[border-style](http://www.w3school.com.cn/cssref/pr_border-style.asp) 中可能的值。 |
| *border-color* | 规定边框的颜色。参阅：[border-color](http://www.w3school.com.cn/cssref/pr_border-color.asp) 中可能的值。 |
| inherit        | 规定应该从父元素继承 border 属性的设置。                     |

#### position
* position 属性规定元素的定位类型。
* 这个属性定义建立元素布局所用的定位机制。任何元素都可以定位，不过绝对或固定元素会生成一个块级框，而不论该元素本身是什么类型。相对定位元素会相对于它在正常流中的默认位置偏移。

!!!note "复杂性提示"
    * 本条目相对复杂，将单开一章（position定位）讲解

| 默认值：          | static                             |
| ----------------- | ---------------------------------- |
| 继承性：          | no                                 |
| 版本：            | CSS2                               |
| JavaScript 语法： | *object*.style.position="absolute" |

* 可能的值

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| absolute | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| fixed    | 生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| relative | 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。 |
| static   | 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。 |
| inherit  | 规定应该从父元素继承 position 属性的值。                     |

#### background
* 这是一个**集合属性**，我们一般将其并起来写，也有时分开来写
* background 简写属性在一个声明中设置所有的背景属性。
* 可以设置如下属性：
    * background-color
    * background-position
    * background-size
    * background-repeat
    * background-origin
    * background-clip
    * background-attachment
    * background-image
* 如果不设置其中的某个值，也不会出问题，比如 background:#ff0000 url('smiley.gif'); 也是允许的。
* 通常建议使用这个属性，而不是分别使用单个属性，因为这个属性在较老的浏览器中能够得到更好的支持，而且需要键入的字母也更少。

| 默认值：          | *not specified*                                           |
| ----------------- | --------------------------------------------------------- |
| 继承性：          | no                                                        |
| 版本：            | CSS1 + CSS3                                               |
| JavaScript 语法： | *object*.style.background="white url(paper.gif) repeat-y" |

* 可能的值

| 值                      | 描述                                             | CSS  |
| ----------------------- | ------------------------------------------------ | ---- |
| *background-color*      | 规定要使用的背景颜色。                           | 1    |
| *background-position*   | 规定背景图像的位置。                             | 1    |
| *background-size*       | 规定背景图片的尺寸。                             | 3    |
| *background-repeat*     | 规定如何重复背景图像。                           | 1    |
| *background-origin*     | 规定背景图片的定位区域。                         | 3    |
| *background-clip*       | 规定背景的绘制区域。                             | 3    |
| *background-attachment* | 规定背景图像是否固定或者随着页面的其余部分滚动。 | 1    |
| *background-image*      | 规定要使用的背景图像。                           | 1    |
| inherit                 | 规定应该从父元素继承 background 属性的设置。     | 1    |

#### opacity
* opacity 属性设置元素的不透明级别。

| 默认值：          | 1                          |
| ----------------- | -------------------------- |
| 继承性：          | no                         |
| 版本：            | CSS3                       |
| JavaScript 语法： | *object*.style.opacity=0.5 |

* 语法
```
opacity: value|inherit;
```

| 值      | 描述                                                    | 测试                                                       |
| ------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| *value* | 规定不透明度。从 0.0 （完全透明）到 1.0（完全不透明）。 | [测试](http://www.w3school.com.cn/tiy/c.asp?f=css_opacity) |
| inherit | 应该从父元素继承 opacity 属性的值。                     |                                                            |

#### transition

!!!tip "复杂性提示"
    * 该属性较复杂，我们一般选取现成的属性来用
    * 自己写请进行详细测试再用
* 定义元素过渡效果
* transition 属性是一个简写属性，用于设置四个过渡属性：
    * transition-property
    * transition-duration
    * transition-timing-function
    * transition-delay
**注释：**请始终设置 [transition-duration](http://www.w3school.com.cn/cssref/pr_transition-duration.asp) 属性，否则时长为 0，就不会产生过渡效果。

| 默认值：          | all 0 ease 0                         |
| ----------------- | ------------------------------------ |
| 继承性：          | no                                   |
| 版本：            | CSS3                                 |
| JavaScript 语法： | *object*.style.transition="width 2s" |

* 语法
```
transition: property duration timing-function delay;
```

| 值                                                           | 描述                                |
| ------------------------------------------------------------ | ----------------------------------- |
| [transition-property](http://www.w3school.com.cn/cssref/pr_transition-property.asp) | 规定设置过渡效果的 CSS 属性的名称。 |
| [transition-duration](http://www.w3school.com.cn/cssref/pr_transition-duration.asp) | 规定完成过渡效果需要多少秒或毫秒。  |
| [transition-timing-function](http://www.w3school.com.cn/cssref/pr_transition-timing-function.asp) | 规定速度效果的速度曲线。            |
| [transition-delay](http://www.w3school.com.cn/cssref/pr_transition-delay.asp) | 定义过渡效果何时开始。              |

* 实例
把鼠标指针放到 div 元素上，会产生带有平滑改变元素宽度的过渡效果：
```
div
{
transition-property:width;
-moz-transition-property: width; /* Firefox 4 */
-webkit-transition-property:width; /* Safari 和 Chrome */
-o-transition-property:width; /* Opera */
}
```

#### animation

!!!warning "复杂性警告"
     * 该属性较复杂，我们一般不进行使用
          * 若要使用，我们一般选取现成的属性来用
          * 自己写请进行详细测试再用

* animation 属性是一个简写属性，用于设置六个动画属性：
    * animation-name
    * animation-duration
    * animation-timing-function
    * animation-delay
    * animation-iteration-count
    * animation-direction
* **注释：**请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。

| 默认值：          | none 0 ease 0 1 normal                        |
| ----------------- | --------------------------------------------- |
| 继承性：          | no                                            |
| 版本：            | CSS3                                          |
| JavaScript 语法： | *object*.style.animation="mymove 5s infinite" |

* 语法
```
animation: name duration timing-function delay iteration-count direction;
```

| 值                          | 描述                                     |
| --------------------------- | ---------------------------------------- |
| *animation-name*            | 规定需要绑定到选择器的 keyframe 名称。 |
| *animation-duration*        | 规定完成动画所花费的时间，以秒或毫秒计。 |
| *animation-timing-function* | 规定动画的速度曲线。                     |
| *animation-delay*           | 规定在动画开始之前的延迟。               |
| *animation-iteration-count* | 规定动画应该播放的次数。                 |
| *animation-direction*       | 规定是否应该轮流反向播放动画。           |

### CSS的集合样式
* 有些CSS样式可以将多个属性并为一个，如`padding`、`margin`、`border`等
* 这些属性也可以分开来写，如`padding-top`可单独定义某元素上边的padding值
* 其他详情可以看所有属性的参考手册

### 不是非常常用的一些属性
#### border-radius
* 该属性允许您为元素添加圆角边框
* <http://www.w3school.com.cn/cssref/pr_border-radius.asp>

#### overflow-x/y
* overflow-x 属性规定如果溢出元素内容区域，是否对内容的左/右边缘进行裁剪。
* <http://www.w3school.com.cn/cssref/pr_overflow-x.asp>
* <http://www.w3school.com.cn/cssref/pr_overflow-y.asp>

#### max/min-height/width
* 定义元素的最大/小宽/高度
* <http://www.w3school.com.cn/cssref/pr_dim_max-height.asp>
* <http://www.w3school.com.cn/cssref/pr_dim_max-width.asp>
* <http://www.w3school.com.cn/cssref/pr_dim_min-height.asp>
* <http://www.w3school.com.cn/cssref/pr_dim_min-width.asp>

#### float/top/left/right
* position定位所需的值，见position定位

#### z-index
* z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。
* 注释：元素可拥有负的 z-index 属性值。
* 注释：Z-index 仅能在定位元素上奏效（例如 position:absolute;）！
* <http://www.w3school.com.cn/cssref/pr_pos_z-index.asp>

#### border-collapse
* border-collapse 属性设置表格的边框是否被合并为一个单一的边框，还是象在标准的 HTML 中那样分开显示。
* <http://www.w3school.com.cn/cssref/pr_tab_border-collapse.asp>
* TIY<http://www.w3school.com.cn/tiy/t.asp?f=csse_table_border-collapse>

#### overflow
* 标识超过范围的文本如何处理
* 以下例子效果为：超过范围的不换行，隐藏，并在末尾显示`...`
```css
display: block;
margin: auto auto;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```












































