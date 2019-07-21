# 润梦正式报名表
## 正式报名表v6
### 前言
* 为了降低程序（数据库）的复杂程度，v6版本改成了**上传xlsx报名表**文件，想要看报名表填写版本，请见v4（i4.php）
* 关于v4：v4的复杂性在于上传数据、填写数据，1，上传数据在后端（php）写判断时候容易出错，2，填写数据时候数据**不会保存**（实际上是懒得做，理应填写数据随时保存到localstorage，也不麻烦，不过已经写完了就懒得加了，最后加了快速报名（如果提交时候刷新了可以快速报名）），说是说比较麻烦，不过实际操作也没出什么大问题，不过双代的似乎全部都没有数据，也不知道是所有人都没填还是啥玩意，出过一次问题就是**服务商没有清缓存**，**硬盘空间满了**，然后php就无法执行，数据库也无法访问，但是静态页面不会出问题，但是正式报名就爆炸了，不过问题也不是很大。
* 关于v6：将手动填写报名表改成了**上传xlsx**，注意：所有xlsx拖放、读取数据都是本地操作，在上传之前都是本地内容，没有上传到服务器（注意：v6的**支付图片也改成了本地显示**！），但是如果数据库爆炸了还是照样爆炸的，解决方法：拿小钱钱换服务器。
* v6可以改进的点：
    * 检查正式报名表填写的学校与选择的学校名称是否相符
    * 检查正式报名表填写的会场是否与规定的一致（xlsx中给选项）
    * 检查正式报名表填写的席位是否与规定的一致（xlsx中给选项，有点困难，但是这个填写符合规范应该是没有问题的，可以给显示一个席位表）
    * 读取学校列表（a步时候）可以直接写成固定json丢COS，减少了获取内容的压力
* 正式发布前需要注意的内容：
    * 将大篇幅的js写成单独的js文件丢COS（将php中js删除），减少从服务器获取的压力（如果只有一点点那也无伤大雅，随便了，比如pdf页面），不推荐进行压缩，本来没多大，压缩可能出错（之前有出过错）
    * 将所有非COS的文件都丢到COS中，尤其是bootcdn的文件，之前出过问题，bootcdn不知道搞什么东西，资源失效过，链接替换为了cloudfare

### 分析v6
### 外链数据
* 这里还没有单独提出js，纯文本、框架就不解释了
* `<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/jquery.min.js"></script>`
* Jquery(js)
* `<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/bootstrap.min.js"></script>`
* bootstrap(js)
* `<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/popper.min.js"></script>`
* bootstrap的弹窗插件
* `<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/bootstrap-material-design.js"></script>`
* materdesign(js)【<https://github.com/FezVrasta/bootstrap-material-design>】，有兴趣可以换成【<https://github.com/mdbootstrap/bootstrap-material-design>】
* `<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/framaterial.min.js"></script>`
* framaterial（只有第一个单选框使用了[好像是]）【<https://github.com/Framaterial/framaterial>】
* `<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/cos-js-sdk-v5.min.js"></script>`
* 腾讯云对象存储（COS）SDK
* `<!--<script src="./xlsx.new.min.js"></script>-->``<script src="https://cdn.bootcss.com/xlsx/0.14.3/xlsx.core.min.js"></script>`
* xlsx模块（由于此处只需要读取，最好用core，比较小）（注：关于xlsx.js见单独的说明）
* `<!--<script src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/js/rregv2.js?v=1"></script>-->`
* 把js单独来一个代码丢COS
* `<link href="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/css/framaterial.min.css" rel="stylesheet" />`
* framaterial的css
* `<link href="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/css/bootstrap-material-design.css" rel="stylesheet">`
* bsmd的css
* `<link href="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/css/docs.min.css" rel="stylesheet">`
* bsmd的单独css（与源站不同，有修改）

### style
```
*{user-select: none;-webkit-user-select: none;}
//禁止选择
.c-align-center{text-align: center;}
//居中
.container{transition: all 0.5s ease 0s !important;padding: 2%;}
//卡片变换渐变设置(transition)
ul{pointer-events: none;}
//列表禁止单击（a卡片协议显示需要，关闭单击特效）
.bottom-a{bottom:0;}
//卡片高度大于窗口高度时底边不空白
th , td{vertical-align: middle !important;}
//表格内容上下居中
input, textarea {-khtml-user-select: text!important;-moz-user-select: text!important;-ms-user-select: text!important;-o-user-select: text!important;user-select: text!important;-webkit-user-select: text!important;}
//输入框(input)和大型输入框(textarea)可选择，修复safari的问题
#drop, #drop-pic{border:2px dashed #bbb;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;padding:25px;text-align:center;font:20pt bold,"Vollkorn";color:#bbb}
//拖拽框的css
```

### JS（初始化和文件处理部分）
```
var load_btn,bg,AModalText,reg,SchoolList,RegList,now = "a";
//变量说明：加载圈，背景(窗口)，弹出模态框，卡片列表，学校列表，学校信息，当前卡片
$(document).ready(function(){
//资源加载完成调用函数
    load_btn = document.getElementById("load_btn");
    //加载圈
    bg = document.getElementById("bg");
    //背景（窗口），宽高都为100%，用于读取窗口宽高，以下直接称窗口宽高
    AModalText=document.getElementById("AlertModal-text");
    //弹出提示框（模态框）
    reg = {
        a:document.getElementById("reg-a"),
        b:document.getElementById("reg-b"),
        c:document.getElementById("reg-c"),
        d:document.getElementById("reg-d"),
        e:document.getElementById("reg-e"),
        f:document.getElementById("reg-f"),
        g:document.getElementById("reg-g")
    };
    //卡片列表
    setInterval(function(){
    //时钟事件，15ms一次，66.67fps，目标为60fps
        reg[now].offsetHeight <= bg.offsetHeight ? ($("#reg-"+now).addClass("bottom-a")) : ($("#reg-"+now).removeClass("bottom-a"));
        //判断当前卡片的高度是否小于等于窗口,若小于，则bottom:0（底边和父元素空间0），大于则保持默认，上下居中
    },15);
    $('body').bootstrapMaterialDesign();
    //body元素进行materialDedign初始化
    //文件处理（以下调用xlsxDEMO，有修改）
    var X = XLSX;
    //XLSX全局变量
    var to_json = function (workbook) {
    //转JSOn函数
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if(roa.length) result[sheetName] = roa;
		});
		return result;
	};
    var process_wb = function (wb) {
    //处理函数
		output = to_json(wb);
		//将结果转json
		output = output["正式报名表"];
		//取出json中的“正式报名表”数据表
		if(output===undefined){
		//如果未找到表，弹窗提示
		    AlertM("文件名："+retArr.file.name+"<br/>文件类型："+retArr.file.type+"<br/>该报名表数据无法读取，请检查文件后重新选择<br/>若确认文件无误，仍可点击确认上传");
		}else{
		    console.log(output);//输出数据
		    regAct.outInfo(output);
		    //调用outInfo函数将数据处理成HTML表格
		}
	};
    var do_file = function (files) {
    //处理XLSX文件
		var f = files[0];
		//取出文件列表第一个文件
		retArr.file=f;
		//将文件保存到retArr（结果返回值）中
		var reader = new FileReader();
		//初始化FileReader（H5的API）
		reader.onload = function(e) {
		//reader读取完毕
			console.log("onload_xlsx", new Date());
			//输出开始处理时间
			var data = e.target.result;
			//取结果
			data = new Uint8Array(data);
			//结果转二进制
			process_wb(X.read(data, {type: 'array'}));
			//XLSX处理
		};
		reader.readAsArrayBuffer(f);
		//开始读取文件
	};
	var do_pic = function (files) {
	//处理图片文件，一样的就不解释了
		var f = files[0];
		retArr.pic=f;
		document.getElementById("pay-img").src=URL.createObjectURL(f);
		//直接将文件创建bloburl，赋给src，与直接图片链接效果相同（createObjectURL填入Blob对象，file是blob的特殊类型）
		AlertM("文件名："+retArr.pic.name+"<br/>文件类型："+retArr.pic.type+"<br/>文件大小："+Math.round(retArr.pic.size/1024*1000)/1000+"KB<br/>请确认左图为正确文件后点击确认上传");
		//弹出提示框
	};
	document.getElementById("xlsx_file").addEventListener('change',function(e){do_file(e.target.files);}, false);
	//对xlsx_file文件选择框添加change（文件改变）事件监听器，改变后调用处理函数
	document.getElementById("pic_file").addEventListener('change',function(e){do_pic(e.target.files);}, false);
	var drop = document.getElementById('drop');
	//获取drop（拖拽框）对象
	var drop_pic = document.getElementById('drop-pic');
	if(!drop.addEventListener) return;
	//如果不存在drop对象或不支持addEventListener，则终止函数
	if(!drop_pic.addEventListener) return;
	function handleDrop(e) {
	//处理拖放事件(文件在对象上释放)
		e.stopPropagation();
		//阻止冒泡事件（消息传递至上层建筑）
		e.preventDefault();
		//阻止默认事件
		console.log(e.dataTransfer.files);
		//输出文件列表
		do_file(e.dataTransfer.files);
		//处理文件
	}
	function handleDrop_pic(e) {
		e.stopPropagation();
		e.preventDefault();
		console.log(e.dataTransfer.files);
		do_pic(e.dataTransfer.files);
	}
	function handleDragover(e) {
	//处理拖放事件（文件在对象上移动）
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
		//设置拖放操作为复制
	}
	drop.addEventListener('dragenter', handleDragover, false);
	//绑定拖放进入对象的事件
	drop.addEventListener('dragover', handleDragover, false);
	//绑定拖放事件（在对象上方）
	drop_pic.addEventListener('dragenter', handleDragover, false);
	drop_pic.addEventListener('dragover', handleDragover, false);
	drop.addEventListener('drop', handleDrop, false);
	//绑定拖放事件（释放）
	drop_pic.addEventListener('drop', handleDrop_pic, false);
    //文件处理结束
});
```

### JS（基础函数声明）
```
window.onload=function(){
//页面加载完成调用函数
    document.getElementById("load_btn").style.display="none";
    //加载完成后取消显示加载圈
};
var downloadXlsx = ()=>{
//下载函数（来源pdf页面）
    AlertM('<div class="progress" style="height: 20px;"><div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" id="prog" style="width: 20%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>');
    //弹出提示框
    var prog=document.getElementById("prog");
    //获取刚才弹出的提示框中进度条对象
    var url = 'https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/%E6%B6%A6%E6%A2%A62019%E6%AD%A3%E5%BC%8F%E6%8A%A5%E5%90%8D%E8%A1%A8(%E7%A9%BA%E7%99%BD).xlsx';
    //xlsxURL
    var urlArr = url.split("/");
    s = urlArr[urlArr.length - 1];
    urlArr = s.split("?");
    file = decodeURI(urlArr[0]);
    //以上获取url中文件名
    s=url;
    var xhr = new XMLHttpRequest();
    //初始化xhr下载对象
    xhr.open('GET', url, true);
    //get方式获取文件
    xhr.responseType = "blob";
    //获取blob二进制对象（文件）
    xhr.onload = function () {
        if (this.status === 200) {
        //200下载成功
          var blob = this.response;
          //读取获取到的二进制对象
          s=URL.createObjectURL(blob);
          //将二进制对象创建blobURL
          setTimeout(function(){
          //延时调用函数，1s后显示下载成功
              AlertM('<div style="text-align:center;"><a class="btn btn-info" style="margin:5px;" href="'+s+'" download="'+file+'">点击下载</a></div>');
          },1000);
        }else{
        //其他下载失败
            AlertM("文件传输出错，请重试<br/>错误代码："+this.status+'  '+this.statusText);
        }
    };
    xhr.onprogress = function (e){
    //下载进度调用函数
      console.log(e);
      prog.style.width = e.loaded / e.total * 100 + "%";
      //进度条进度
      prog.innerHTML=e.loaded +'/'+ e.total+'&emsp;&emsp;'+Math.round(e.loaded / e.total * 10000)/100 + "%";;
      //进度条文字
    }
    xhr.send();
    //开始下载
}
var AlertM = (text)=>{
//提示框调用函数
    AModalText.innerHTML=text;
    //提示框内容
    $("#AlertModal").modal("show");
    //显示模态框
};
var check = {
//检查函数列表
    empty:(e)=>{
    //检查是否为空，null,empty,false则返回true，不为空返回false
        return e?false:true;
    },
    notPhone:(e)=>{
    //不是手机则标红
        if(check.empty(e)){
            return '<b style="color:red">空</b>';
        }else if(/^[1-9]\d{10,10}$/.test(e)){
        //正则表达式判断：首位1-9数字+10位数字
            return e;
        }else{
            return '<b style="color:red">'+e+'</b>';
        }
    },
    notQQ:(e)=>{
    //不是QQ则标红
        if(check.empty(e)){
            return '<b style="color:red">空</b>';
        }else if(/^[1-9]\d{4,10}$/.test(e)){
        //首位1-9数字+4-10位数字
            return e;
        }else{
            return '<b style="color:red">'+e+'</b>';
        }
    },
    isIdentity:(e)=>{
    //是身份证返回true，否则返回false
        //18位身份证，X大写
        let regIdCard=/^[1-9]\d{5}[1-2]\d{3}((0[1-9])|(1[0-2]))(0[1-9]|([1|2]\d)|3[0-1])((\d{4})|\d{3}X)$/;
        if(regIdCard.test(e)){
            let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            let idCardY = new Array(1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2);
            let idCardWiSum = 0;
            for (let i = 0; i < 17; i++) {idCardWiSum += e.substring(i, i + 1) * idCardWi[i];}
            let idCardMod = idCardWiSum % 11;
            if (e.substring(17) == idCardY[idCardMod]) {return true;} else {return false;}
        }else{return false}
    },
    notIdentity:(e)=>{
    //不是身份证则标红
        if(check.empty(e)){
            return '<b style="color:red">空</b>';
        }else if(check.isIdentity(e)){
            return e;
        }else{
            return '<b style="color:red">'+e+'</b>';
        }
    },
    notEmpty:(a)=>{
        return a?a:'<b style="color:red">空</b>';
    }
};
//初始化加载圈函数
var load = {
    show: ()=>{
    //显示加载圈
        let height = bg.offsetHeight;
        let width = bg.offsetWidth;
        //获取窗口宽高
        load_btn.style.heigh=height+"px";
        load_btn.style.width=width+"px";
        //加载圈宽高等于窗口宽高（加载圈背景半透明+圈在正中间）
        load_btn.style.display="block";
        //显示加载圈
    },
    //
    none: ()=>{
    //隐藏加载圈
        load_btn.style.display="none";
    },
    up: (e,n)=>{
    //前进卡片（css中设置了渐变，直接改即可）
        reg[e].style.opacity=0;
        //当前卡片的透明度为0
        reg[e].style.left=0-reg[e].offsetWidth+"px";
        //left渐变为负的宽度（卡片右端移动到窗口最左侧）
        reg[e].style.right="auto";
        //右侧自动
        now=n;
        setTimeout(function(){reg[e].style.display="none";reg[n].style.opacity=1;reg[n].style.display="table";load.none();},500);
        //500ms后当前卡片隐藏，下一张卡片透明度1（100%），隐藏加载圈
    },
    back:(e,n)=>{
    //后退卡片
        reg[e].style.opacity=0;
        //当前卡片透明度为0
        now=n;
        setTimeout(function(){reg[e].style.display="none";reg[n].style.opacity=1;reg[n].style.display="table";reg[n].style.left=0;reg[n].style.right=0;},500);
        //500ms后当前卡片隐藏，前一张卡片透明度为1（渐变），前一张卡片左0又0（相当于居中）
    }
};
```

### JS(RegAct)
```
var regAct = {
//a,b,c等函数都是在该卡片点击下一步调用的函数，调用内容见HTML框架
    a: ()=>{
        if(document.getElementById("ck_1").checked){
        //ck_1是第一页选择框旋然后的id，直接搜搜不到，渲染后可见
            load.show();
            $.get("/get/school", function(result){
            //获取学校列表（可做成JSON）
                SchoolList=result.ret;
                var content='';
                result.ret.forEach(function(e){
                //遍历列表
                    content+='<span class="bmd-form-group is-filled"><div class="radio"><label><input type="radio" name="reg-b-school-check" id="reg-b-school-check" value="'+e.school+'"><span class="bmd-radio"></span>'+e.school+'</label></div></span>';
                    //将学校名称渲染为列表
                });
                document.getElementById("SchoolList").innerHTML=content;
                load.up("a","b");
            });
        }else{
            AlertM("请确认须知");
        }
    },
    searchSchool: ()=>{
    //搜索学校
        var key=document.getElementById("SchoolName").value;
        //读取搜索内容（key）
        var content='';
        SchoolList.forEach(function(e){
        //遍历学校列表
            e.school.indexOf(key)!=-1 && (content+='<span class="bmd-form-group is-filled"><div class="radio"><label><input type="radio" name="reg-b-school-check" value="'+e.school+'"><span class="bmd-radio"></span>'+e.school+'</label></div></span>');
            //在学校名中搜索key，如果搜索到（！=-1），则渲染该学校名称
        });
        document.getElementById("SchoolList").innerHTML=content;
    },
    b: ()=>{
        let schoolChecked = $("input[name='reg-b-school-check']:checked").val();
        //获取列表中选择的学校名
        if(schoolChecked!==undefined){
        //判断是否选中
            load.show();
            $.post('/get/schoolInfo',{'s':schoolChecked},function(result){
            //拉取学校信息
                if(result.status==400){
                //status==400则成功
                    RegList=result.ret;
                    retArr.school=schoolChecked;
                    document.getElementById("c-SchoolName").innerHTML=schoolChecked;
                    //将取到的内容填入c卡片
                    if(result.ret.info!=""){
                    //如果信息不为空（undefined），填入
                        document.getElementById("c-SchoolInfo").innerHTML=result.ret.info;
                    }
                    load.up("b","c");
                }else{
                    AlertM("错误："+result.status+"<br/>"+result.ret);
                    load.none();
                }
            });
        }else{
            AlertM("请于单选框选择学校");
        }
    },
    c: ()=>{
        load.up("c","d");
    },
    outInfo: (json)=>{
    //处理xlsxJSON为HTML表格
        var school,leader_name,leader_phone,num,empty='<b style="color:red">空</b>';
        //按照单元格位置读取数据
        school = check.notEmpty(json[2][1]);
        leader_name = check.notEmpty(json[2][3]);
        leader_phone = check.notPhone(json[2][5]);
        var Arr=[],next=true,i=0,leader_pay=1;
        while (next){
        //读取“姓名”列的数据作为人数参考
            if(json[i+4][1]===undefined){
            //如果姓名为空，终止遍历
                break;
            }
            Arr[i]={
                name:check.notEmpty(json[i+4][1]),
                sex:check.notEmpty(json[i+4][2]),
                room:check.notEmpty(json[i+4][3]),
                seat:check.notEmpty(json[i+4][4]),
                double:check.notEmpty(json[i+4][5]),
                phone:check.notPhone(json[i+4][6]),
                identity:check.notIdentity(json[i+4][7].toUpperCase()),
                fri:check.notEmpty(json[i+4][8]),
                sat:check.notEmpty(json[i+4][9])
            }
            //将数据处理为arr数组，顺便判断是否为空，是否符合要求
            i++;
        }
        if(!check.empty(json[2][7]) && json[2][7]!==i){
        //如果人数不为空且和预定人数不符，则标红
            num = '<b style="color:red">'+json[2][7]+'</b>'+'('+i+')';
        }else{
        //否则正常输出
            num = i;
        }
        var content="",j=i,pay;
        //输出为HTML表格
        content+='<div id="agreeI"><h5>以下数据为读取报名表获得，内容和付费项仅供参考，可能有错误的项目已标红，若您确认报名表无错误，可继续上传</h5><ul class="list-group"><li class="list-group-item">学校：'+school+'</li><li class="list-group-item">领队：'+leader_name+'</li><li class="list-group-item">领队手机号：'+leader_phone+'</li><li class="list-group-item">代表人数(不含领队)：'+num+'</li></ul><table class="table table-hover table-bordered"><thead><tr><th scope="col">#</th><th scope="col">姓名</th><th scope="col">性别</th><th scope="col">会场</th><th scope="col">席位</th><th scope="col">双代</th><th scope="col">手机号</th><th scope="col">身份证</th><th scope="col">周五住宿</th><th scope="col">周六住宿</th></tr></thead><tbody>';
        for(var i=1;i<=j;i++){
        //遍历arr数据
            content+='<tr><th scope="row">'+i+'</th><td>'+Arr[i-1].name+'</td><td>'+Arr[i-1].sex+'</td><td>'+Arr[i-1].room+'</td><td>'+Arr[i-1].seat+'</td><td>'+Arr[i-1].double+'</td><td>'+Arr[i-1].phone+'</td><td>'+Arr[i-1].identity+'</td><td>'+Arr[i-1].fri+'</td><td>'+Arr[i-1].sat+'</td>';
            Arr[i-1].name==leader_name && (leader_pay=0);
        }
        ld_pay=leader_pay;
        pay = json[2][9]=="是" ? 0 : 1;
        //判断领队参会数据，为是则为0（不支付）
        if(!check.empty(json[2][9]) && pay!==leader_pay){
        //判断是否填入数据且不等于获取到的数据
            ld_pay = '<b style="color:red">'+pay+'</b>'+'('+leader_pay+')';
        }
        retArr.paytext='<h4>应付会费（仅供参考）：'+num+'人 × ￥330 + '+ld_pay+'人 × ￥200 = ￥'+(j*330+leader_pay*200)+'</h4>';
        //实际参考计算按照读取到的数据计算
        content+='</tbody></table></div></p>'+retArr.paytext;
        document.getElementById("StuList").innerHTML=content;
        $('#agreeI').bootstrapMaterialDesign();
        //对刚加入的表格初始化materialDesign
    },
    d: ()=>{
        if(retArr.file==null){
        //如果file不存在
            AlertM("请选择或拖拽正式报名表文件");
        }else if(retArr.fileUp==false){
        //如果file没有上传
            AlertM("请单击 <b>确认上传</b> 按钮上传或重新上传正式报名表");
        }else{
            load.show();
            //e卡片填入付款信息
            document.getElementById("reg-e-text").innerHTML=retArr.paytext;
            load.up("d","e");
        }
    },
    upD: ()=>{
    //上传xlsx
        upload.putObject(retArr.file,'xlsx/'+retArr.school+".xlsx",0);
        AlertM('<div id="prog-text">文件正在上传，请稍后<br/>请在弹出上传成功提示框后点击下一步<br/>若超过一分钟仍未上传成功，请单击确认上传重试<br/></div><div class="progress" style="height: 20px;"><div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" id="prog" style="width: 20%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>');
        //弹出模态框
    },
    e:()=>{
        load.show();
        load.up("e","f");
    },
    f:()=>{
        if(retArr.pic==null){
        //图片不存在
            AlertM("请选择或拖拽支付截图");
        }else if(retArr.picUp==false){
        //图片未上传
            AlertM("请单击 <b>确认上传</b> 按钮上传或重新上传支付截图");
        }else{
            AlertM("正在提交数据，若超过一分钟未跳转至成功界面，请再次尝试提交数据");
            var back = document.getElementById("reg-f-back").value;
            $.post('/get/reg',{'school':retArr.school,'back':back},function(result){
            //提交数据（学校名称和备注）
                if(result.status!=500){
                //500成功
                    AlertM("错误："+result.status+"<br/>"+result.ret);
                }else{
                //g卡片填入学校名称
                    document.getElementById("reg-g-name").innerHTML=result.ret.school;
                    load.up("f","g");
                }
            });
        }
    },
    upF: ()=>{
    //上传图片，注意：此处文件名为：学校-原图片名称-原后缀，这样是为了简便保留原后缀；v4版本设置的是学校名称+png固定后缀，由于图片文件头自带文件类型，所以png问题也不大
        upload.putObject(retArr.pic,'alipay/'+retArr.school+"-"+retArr.pic.name,1);
        AlertM('<div id="prog-text">文件正在上传，请稍后<br/>请在弹出上传成功提示框后点击下一步<br/>若超过一分钟仍未上传成功，请单击确认上传重试<br/></div><div class="progress" style="height: 20px;"><div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" id="prog" style="width: 20%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>');
    },
};
var retArr = {
//回传数组
    school:null,
    file:null,
    fileUp:false,
    pic:null,
    picUp:false,
    back:null,
    paytext:null
};
// upl
```

### JS（COS腾讯云）
```
// upload
var cos = new COS({
    getAuthorization: function (options,callback) {
    //COS获取鉴权凭证
        var url = './upload/sts.php';
        //这个php文件要存在，下面写php内容
        var xhr = new XMLHttpRequest();
        //xhr获取凭证
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            if(e.target.responseText=="null"){
            //由于服务器原因会获取失败
                AlertM("获取数据错误，请重新上传");
            }
            //回调函数来源腾讯云SDK源码
            var data = JSON.parse(e.target.responseText);
            callback({
                TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                ExpiredTime: data.expiredTime
            });
        };
        xhr.send();
    }
});
var upload={
//上传函数
    Bucket:'2019test-1251935573',
    //存储桶，和鉴权凭证一起改
    Region:'ap-chengdu',
    //存储桶地区
    putObject:(data,file,fileType)=>{
    //简单文件上传，官方文档：【https://cloud.tencent.com/document/product/436/35649】【https://cloud.tencent.com/document/product/436/7749】
        cos.putObject({
            Bucket: upload.Bucket,
            Region: upload.Region,
            Key: file,
            Body: data,
            onProgress: function (progressData) {
            //进度函数
                var prog=document.getElementById("prog");
                //获取进度条元素
                prog.style.width=progressData.percent*100+"%";
                prog.innerHTML=progressData.loaded+"/"+progressData.total+"&emsp;&emsp;"+Math.round(progressData.speed/1024*1000)/1000+"KB/s";
                console.log(JSON.stringify(progressData));
            },
        }, function (err, data) {
            setTimeout(function(){
            //1s后显示上传成功
                document.getElementById("prog-text").innerHTML="上传成功！";
                $("#AlertModal").modal("show");
                if(fileType==0){
                    retArr.fileUp=true;
                }else{
                    retArr.picUp=true;
                }
            },1000);
            
        });
    }
}
```

```
//由于鉴权凭证计算是腾讯云官方sdk，所以就示例参数部分，后面不改
<?php
// 临时密钥计算样例
// 配置参数
$config = array(
    'Url' => 'https://sts.api.qcloud.com/v2/index.php',
    'Domain' => 'sts.api.qcloud.com',
    'Proxy' => '',
    'SecretId' => 'AKIDl****3byAF9weCZllgNy', // 固定密钥
    //腾讯云SecretKey
    'SecretKey' => 'kLTV****GcptlBRVN3Yr', // 固定密钥
    //腾讯云SecretID
    'Bucket' => '2019test-1251935573',
    //存储桶
    'Region' => 'ap-chengdu',
    //存储桶地区
    'AllowPrefix' => '*', // 必填，这里改成允许的路径前缀，这里可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 a/* 或者 a.jpg
);
```

### HTML框架

```
<body style="margin:0;padding:0">
    <div style="position:absolute;z-index:-999;width:100%;height:100%;" id="bg"></div>
    //背景（为读取窗口大小设置的元素）
    <div class="m-card-lightblue" id="load_btn" style="position: fixed;width: 100%;height: 100%;z-index: 999;padding: 0;margin: 0;top: 0;background: rgba(255,255,255,.8);">
        <div class="m-spinner-blue center-force"></div>
    </div>
    //加载圈
    <!---->
    <div class="modal fade" id="AlertModal" tabindex="-1" role="dialog" aria-labelledby="AlertModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AlertModal-title">提示</h5>
          </div>
          <div class="modal-body" id="AlertModal-text"></div>
          //提示信息框
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">确认</button>
          </div>
        </div>
      </div>
    </div>
    //提示模态框
    <!---->
    <div id="reg-a" class="container material-container" style="width:70%;margin:auto;position:absolute;left:0;top:0;right:0;display:table;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr/>
            <h4 class="c-align-center">须知确认（1/7）</h4>
            <hr>
            <div class="alert alert-info" role="alert">
                <h4 class="alert-heading">在正式报名前你需要知晓《报名须知》</h4>
                //须知，注意不要出现最终解释权等内容
                <hr>
                <ul>
                  <li>阅读并同意本《报名须知》（以下简称《须知》），方可报名润梦2019模拟联合国大会</li>
                  <li>在本次报名开放前填写的《预报名表》和《会场意向表》生效，本表开放后（截至2019/10/1 18:00）数据不再进行同步（特殊情况除外）</li>
                  <li>填写本表即代表正式报名润梦2019模拟联合国大会，请认真填写本表</li>
                  <li>本表截止报名后，不会重新开放，请各位代表注意在本表截止日期前完成填写（特殊情况除外）</li>
                  <li>在最后 <b>确认报名页面</b> 单击 <b>确认报名按钮</b> 后，会显示报名成功，再此之前仍然可以对先前的报名数据进行修改</li>
                  <li>一旦报名及付费成功，为保护代表个人信息，该学校将被锁定，不再开放修改（特殊情况除外）</li>
                  <li>请使用较高版本和兼容性较好的浏览器（如Google Chrome等）进行报名，不支持IE浏览器（360等浏览器请使用极速模式）</li>
                  <li>请使用宽度大于720px的浏览器进行报名，推荐使用电脑端浏览器进行报名</li>
                  <li>使用不合适的浏览器打开本页面可能造成的后果可能有<ul>
                      <li>页面显示不全</li>
                      <li>报名信息提交失败</li>
                      <li>无法输入信息</li>
                      <li>支付失败</li>
                      <li>无法上传支付截图</li>
                      <li>等</li>
                  </ul></li>
                  <li>本表内付款仅限 <b>代表</b> 的 <b>会费</b> ，观察员的会费及所有住宿费用不在此项，请勿同时付款</li>
                  <li style="color:red"><b>正式报名成功后不接受任何形式的退款要求，付款前请务必确认好各项信息的准确有效</b></li>
                  <li>请各位代表付款后妥善保留好支付截图作为支付凭证</li>
                  <li>请在填表前确认可支付款项充足，请勿分为多次进行付费，付费后请截图并在本表内上传方为有效支付，如有特殊情况，请联系秘书长</li>
                  <li>润梦2019模拟联合国大会《住宿信息表格》未被包含在本表内，需要填写该表的领队请至官网首页下载该表</li>
                  <li>由于本《须知》中所提到的条目落空，而造成的报名失败或填写错误等问题，润梦2019组委会不对此负责</li>
                  <li>如有特殊情况请与秘书长协商和沟通</li>
                  <li>本《须知》可能进行更新或修改，组委会不会对此进行通知</li>
                </ul>
            </div>
            <hr/>
            <input type="checkbox" class="m-input-checkbox-lightblue" id="reg-a-check"  data-label="我已阅读并同意以上须知">
            <button type="button" class="btn btn-raised btn-info float-left btn-lg" id="reg-a-dl" onclick="downloadXlsx()">下载报名表单</button>
            <button type="button" class="btn btn-raised btn-info float-right btn-lg" id="reg-a-next" onclick="regAct.a()">下一步</button>
            
        </div>
    </div>
    <!---->
    <div id="reg-b" class="container material-container" style="width:450px;margin:auto;position:absolute;left:0;top:0;right:0;display:none;opacity: 0;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr>
            <h4 class="c-align-center">学校选择（2/7）</h4>
            <hr>
            <form>
                <div class="form-group bmd-form-group">
                    <label for="SchoolName" class="bmd-label-floating">输入您的学校名称进行筛选</label>
                    <input type="text" class="form-control" id="SchoolName" oninput="regAct.searchSchool()">
                </div>
                <h6>请在以下列表进行选择</h6>
                <div id="SchoolList"></div>
            </form>
            <hr>
            <button type="button" class="btn btn-raised btn-info float-left btn-lg" id="reg-b-next" onclick="load.back('b','a');">上一步</button>
            <button type="button" class="btn btn-raised btn-info float-right btn-lg" id="reg-b-next" onclick="regAct.b();">下一步</button>
        </div>
    </div>
    <!---->
    <div id="reg-c" class="container material-container" style="width:600px;margin:auto;position:absolute;left:0;top:0;right:0;display:none;opacity: 0;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr>
            <h4 class="c-align-center">填写正式报名表（3/7）</h4>
            <hr>
            <div class="c-align-center">
            //提示信息
                <h5 style="text-align:left">尊敬的 <b id="c-SchoolName"></b> 代表，您好！<br/>&emsp;&emsp;请填写您在第一步下载的正式报名表，若您没有下载，可点击下方 <b>下载报名表</b> 按钮进行下载。<br/>&emsp;&emsp;请确认您的<b>学校名称</b>和<b>席位数据</b>正常，如有错误，请单击 <b>上一步</b> 重新选择或联系秘书长。<br/>&emsp;&emsp;注：<b>请勿修改</b>非报名数据内容和工作表名称，否则可能造成无法预料的错误。<br/><br/>报名数据或提示信息：<span id="c-SchoolInfo"></span><br/><br/>填写完毕后请点击 <b>下一步</b> 上传报名表</h5>
            </div>
            <hr>
            <div class="float-left">
                <button type="button" class="btn btn-raised btn-info btn-lg" id="reg-c-next" onclick="load.back('c','b');">上一步</button>
                <button type="button" class="btn btn-raised btn-info btn-lg" id="reg-a-dl" onclick="downloadXlsx()">下载报名表单</button>
            </div>
            <button type="button" class="btn btn-raised btn-info float-right btn-lg" id="reg-c-next" onclick="regAct.c();">下一步</button>
        </div>
    </div>
    <!---->
    <div id="reg-d" class="container material-container" style="width:70%;min-width:720px;margin:auto;position:absolute;left:0;top:0;right:0;display:none;opacity: 0;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr>
            <h4 class="c-align-center">上传正式报名表（4/7）</h4>
            <hr>
            <div id="StuList"></div>
            <div style="text-align: center;">
            //上传xlsx
                <div id="drop">拖拽填写完毕的正式报名表文件至此或在下方选择文件上传</div>
                <input type="file" accept=".xlsx" value="选择正式报名表" id="xlsx_file"><button type="button" class="btn btn-raised btn-info btn-sm" onclick="regAct.upD();" id="up-xlsx">确认上传</button>
                <h5>注：在单击确认上传前，您可以随时拖拽或选择新文件覆盖原先选择的文件。在最后一步确认报名前，您可以随时回退到当前步骤重新上传文件覆盖原先上传的文件。</h5>
            </div>
            <hr>
            <div>
                <button type="button" class="btn btn-raised btn-info float-left btn-lg" id="reg-d-next" onclick="load.back('d','c');">上一步</button>
                <div class="float-right">
                    <button type="button" class="btn btn-raised btn-info btn-lg" id="reg-e-next" onclick="regAct.d();">下一步</button>
                </div>
            </div>
        </div>
    </div>
    <!---->
    <div id="reg-e" class="container material-container" style="width:70%;margin:auto;position:absolute;left:0;top:0;right:0;display:none;opacity: 0;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr>
            <h4 class="c-align-center">付款（5/7）</h4>
            <hr>
            <div id="agree" class="row">
                <div class="col" style="text-align:center">
                    <img src="https://runmun-1251935573.cos.ap-chengdu.myqcloud.com/rreg/alipay.jpg" style="width: 250px;">
                    //支付宝收款码，可以尝试用商家收款码，zfb送提现到银行卡额度
                </div>
                <div class="col" style="text-align:center">
                    <h3>支付宝</h3>
                    <h3>扫描二维码付款后截图</h3>
                    <h4 id="reg-e-text"></h4>
                    <h4>支付备注：学校名称—领队姓名—代表人数(领队不参会则不计)</h4>
                    <h4>截图请包含：金额、订单号</h4>
                </div>
            </div>
            <hr>
            <button type="button" class="btn btn-raised btn-info float-left btn-lg" id="reg-e-next" onclick="load.back('e','d');">上一步</button>
            <button type="button" class="btn btn-raised btn-info btn-lg float-right" id="reg-e-next" onclick="regAct.e();">下一步</button>
        </div>
    </div>
    <!---->
    <div id="reg-f" class="container material-container" style="width:700px;margin:auto;position:absolute;left:0;top:0;right:0;display:none;opacity: 0;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr>
            <h4 class="c-align-center">上传付款截图（6/7）</h4>
            <hr>
            <div id="pay" class="row">
                <div class="col" style="text-align:center">
                    <img src="https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png" style="width: 250px;" id="pay-img">
                    //这里src随便找了张zfb的图，注意pay-img留着即可，src可以改，此处显示的是选择的截图
                </div>
                <div class="col" style="text-align:center">
                    <div id="drop-pic">拖拽支付截图文件至此或在下方选择文件上传(多张图片请压缩为一个压缩包进行上传)</div>
                    <input type="file" accept="image/*" value="选择支付截图" id="pic_file"><button type="button" class="btn btn-raised btn-info btn-sm" onclick="regAct.upF();" id="up-xlsx">确认上传</button>
                    <h5>注：在单击确认上传前，您可以随时拖拽或选择新文件覆盖原先选择的文件。在最后一步确认报名前，您可以随时回退到当前步骤重新上传文件覆盖原先上传的文件。</h5>
                </div>
            </div>
            <h5>备注项（选填）</h5>
            <textarea class="form-control" id="reg-f-back" rows="3"></textarea>
            <hr>
            <button type="button" class="btn btn-raised btn-info float-left btn-lg" id="reg-f-next" onclick="load.back('f','e');">上一步</button>
            <button type="button" class="btn btn-raised btn-info btn-lg float-right" id="reg-f-next" onclick="regAct.f();">提交数据</button>
        </div>
    </div>
    <!---->
    <div id="reg-g" class="container material-container" style="width:70%;margin:auto;position:absolute;left:0;top:0;right:0;display:none;opacity: 0;">
        <div class="card" style="display:table-cell;vertical-align: middle;padding: 30px;">
            <h4 class="c-align-center">润梦 RUNMUN 2019 中学生模拟联合国大会</h4>
            <h3 class="c-align-center">正式报名</h3>
            <hr>
            <h4 class="c-align-center">报名成功（7/7）</h4>
            <hr>
            <div id="thanks">尊敬的 <b id="reg-g-name"></b> 代表，您已成功报名润梦 RUNMUN 2019模拟联合国大会！<br/>&emsp;&emsp;</div>
            <hr>
            <h4>感谢您对润梦的支持和信任！润梦，梦在润园，润园润梦，顺颂曼福。</h4>
            <button type="button" class="btn btn-raised btn-info btn-lg float-right" id="reg-g-next" onclick="parent.location.href='/?spm=rreg';">返回首页</button>
        </div>
    </div>
    <!---->
</body>
```





























