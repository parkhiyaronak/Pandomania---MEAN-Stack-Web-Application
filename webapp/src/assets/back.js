function myFunction() {


  var person = prompt("Please enter your name", "Harry Potter");
  if (person != null) {
    document.getElementById("name").innerHTML = "Name: " + person;
  }
  var Age = prompt("please enter your age");
  if(isNaN(Age)){
      document.write(Age+"not a number");
      myFunction();
  }

  document.getElementById("age").innerHTML = "Age: " + Age;
  var location = prompt("Enter city");
  function allLetter(location){
      var letters = /^[A-Za-z]+$/;
      if(location.value.match(letters)){
        document.getElementById("demo").innerHTML = "Location: " + location;
      }
      else{
          alert("incorrect");
          myFunction();
      }
  }
  var sym1 = prompt("Do you have dry cough?(yes/no)");
  document.getElementById("sym1").innerHTML = "Symptom1: Cough :" + sym1;
  var sym2 = prompt("Is your body temperature above 90 F?(yes/no)");
  document.getElementById("sym2").innerHTML = "Symptom2: Fever " + sym2;
  var sym3 = prompt("Do you experience constant fatigue?(yes/no)");
  document.getElementById("sym3").innerHTML = "Symptom3: Fatigue " + sym3;
  var sym4 = prompt("Do you have breathing difficulties?(yes/no)");
  document.getElementById("sym4").innerHTML = "Symptom4: Breathing problem: " + sym4;
  var sym5 = prompt("Do yo have body ache?(yes/no)");
  document.getElementById("sym5").innerHTML = "Symptom5: Body Ache: " + sym5;
  var sym6 = prompt("Do you have lack of appetite?(yes/no)");
  document.getElementById("sym6").innerHTML = "Symptom6: Lack of Appetite: " + sym6;

  if(Age<40){
      if(sym1=="yes"|| sym2=="yes"){
        document.getElementById("remark").innerHTML = "Result: High risk! we strongly recommend to Consult Doctor and remain in quarantine.";
        document.getElementById("remark").style.color = "#db2121";
        document.getElementById("next").innerHTML = "Click button to try again.";
      }
      else if(sym1=="no"){
          if(sym2=="yes"|| sym4=="yes"){
            document.getElementById("remark").innerHTML = "Result: High risk! we strongly recommend to Consult Doctor and remain in quarantine";
            document.getElementById("remark").style.color = "#db2121";
            document.getElementById("next").innerHTML = "Click button to try again.";
          }
      }
      else{
        document.getElementById("remark").innerHTML = "Result: Low risk. Stay safe.";
        document.getElementById("remark").style.color = "#65db21";
        document.getElementById("next").innerHTML = "Click button to try again.";
      }
  }else if(Age>40){
      if(sym1=="yes"|| sym2=="yes"){
        document.getElementById("remark").innerHTML = "Result: High risk! we strongly recommend to Consult Doctor and remain in quarantine";
        document.getElementById("remark").style.color = "#db2121";
        document.getElementById("next").innerHTML = "Click button to try again.";
      }else if(sym1=="no"|| sym4=="yes"){
        document.getElementById("remark").innerHTML = "Result: High risk! we strongly recommend to Consult Doctor and remain in quarantine";
        document.getElementById("remark").style.color = "#db2121";
        document.getElementById("next").innerHTML = "Click button to try again.";
      }else{
        document.getElementById("remark").innerHTML = "Result: Low risk. Stay safe.";
        document.getElementById("remark").style.color = "#65db21";
        document.getElementById("next").innerHTML = "Click button to try again.";
      }
  }


}
