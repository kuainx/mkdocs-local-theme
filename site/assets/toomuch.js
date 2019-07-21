var list = document.getElementsByTagName("c");
for(let index in list) {
    console.log(index,list[index]);
    list[index].className="cover";
    list[index].title="你知道得太多了  0v0";
}

