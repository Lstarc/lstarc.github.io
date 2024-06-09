
function background(){
    var bodyBgs = [];
        bodyBgs[0] = "00B3FF";
        bodyBgs[1] = "2E417B";
        bodyBgs[2] = "9DAD7F";
        bodyBgs[3] = "B8E3DB";
        bodyBgs[4] = "FEDBD0";
        bodyBgs[5] = "FF6B6B";
        bodyBgs[6] = "FF61D6";
        bodyBgs[7] = "FFAF00";

        var randomBgIndex = Math.round( Math.random() * 7 );

    //输出随机的背景图
        document.write('<style>body{background: url( background/' + bodyBgs[randomBgIndex]
        + '.svg) no-repeat center center fixed;background-size:cover;}.input{background-color:#'+bodyBgs[randomBgIndex]
        +';}</style>');
        
        //document.getElementById("submit1").style.backgroundColor = 'pink';
}
background();