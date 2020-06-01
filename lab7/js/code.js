function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

  window.onbeforeunload = function() {
    localStorage.setItem("fname", document.getElementById('fname').value);
    localStorage.setItem("lname", document.getElementById('lname').value);  
    localStorage.setItem("email", document.getElementById('email').value);  
    localStorage.setItem("phn", document.getElementById('phn').value); 
  } 

  window.onload = function() {
    let fname = localStorage.getItem("fname");
    let lname = localStorage.getItem("lname"); 
    let email = this.localStorage.getItem('email'); 
    let phn = this.localStorage.getItem('phn'); 

    if (fname !== null) document.getElementById('fname').value = fname;
    if (lname !== null) document.getElementById('lname').value = lname; 
    if (email !== null) document.getElementById('email').value = email; 
    if (phn !== null) document.getElementById('phn').value = phn;
}

