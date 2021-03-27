window.onscroll = function(){
    var heightOfWindow = window.innerHeight;
    var contentScrolled = window.pageYOffset;
    var bodyHeight = window.document.getElementsByTagName("body")[0].offsetHeight;
    if(bodyHeight - contentScrolled <= heightOfWindow)
   {
       window.document.getElementById("percentage").innerHTML = "2016";
   }
   else
   {
       var total = bodyHeight - heightOfWindow;
       var got = contentScrolled;
	   if(parseInt((got/total) * 100) <= 18)
	   {
			window.document.getElementById("percentage").innerHTML = "2021";
	   }
       else if(parseInt((got/total) * 100) <= 48)
       {
            window.document.getElementById("percentage").innerHTML = "2020";
       }
       else if(parseInt((got/total) * 100) <= 74)
       {
            window.document.getElementById("percentage").innerHTML = "2019";
       }
       else if(parseInt((got/total) * 100) <= 100)
       {
            window.document.getElementById("percentage").innerHTML = "2018";
       }
       else
       {
            window.document.getElementById("percentage").innerHTML = "2016";
       }
   }
}
