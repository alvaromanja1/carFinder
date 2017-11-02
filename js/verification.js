    function isValidEmail(nick) {
    
        var email = document.getElementById("nick").value; 
        var patron=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        
           if(email.search(patron)==0)
           {
            document.getElementById("errorEmail").innerHTML = "Correct email";
            return;
           }
           document.getElementById("errorEmail").innerHTML = "Email's format is incorrect";
    }

    function deleteAll(realname, nick, pass, rpass){
        
        document.getElementById("realname").innerHTML=" "; 
        document.getElementById("nick").innerHTML=" "; 
        document.getElementById("pass").innerHTML=" "; 
        document.getElementById("telephone").innerHTML=" "; 
        
    }    
        
    function validate(){
        
          var realname = document.getElementById("realname").value; 
          var nick = document.getElementById("nick").value; 
          var pass = document.getElementById("pass").value; 
          var telephone = document.getElementById("telephone").value; 
          var patron=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

          if(realname == "" |nick== "" | pass == "" | telephone == ""){
              alert("You must fill all the fields"); 
          }
          else if(realname.length > 30){
              alert("Your name is too long"); 
          }
          
    }

    
   