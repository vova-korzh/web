document.body.onload = function () {
    setTimeout(function () {
      document.getElementById("loader").style.visibility = "hidden"; 
      document.getElementById("myDiv").style.display = "block";
    }, 1000)
  }