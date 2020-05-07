var playButton = document.getElementById("playBtn");
playButton.addEventListener("click",showGame);
var wordArray = ["E A R T H","B I R T H","T O R C H","C O N D O L E N C E S","P R I V I L E G E","A N C H O R A G E"];
var alphabetsArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var imageArray = ["https://www.oligalma.com/downloads/images/hangman/hangman/0.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/1.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/2.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/3.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/4.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/5.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/6.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/7.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/8.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/9.jpg","https://www.oligalma.com/downloads/images/hangman/hangman/10.jpg"];
var inputArray = [];
var displayCount = 0;
var wrongCount = 0;
var bufferArray =[];
var valueSetFlag = false;

function showGame(){
    console.log("Working");
    event.target.remove();
    // var playCont = document.createElement("div");
    var playCont = document.getElementById("playCont");
    for(var i = 0; i < 26; i ++){
        var letterBtn = document.createElement("button");
        letterBtn.setAttribute("class","letterBtnclass");
        letterBtn.textContent = alphabetsArray[i];
        playCont.append(letterBtn);
    }
    var btnList = document.querySelectorAll("button");
    var letterButtonArray = Array.from(btnList);
    // console.log(letterButtonArray[0]);
    
    for(var i = 0; i < 26; i ++){
        letterButtonArray[i].addEventListener("click",displayOperations);
        // console.log(letterButtonArray[i])
    }
    var hiddenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    console.log(hiddenWord);
    var hiddenLength = hiddenWord.length;
    console.log(hiddenLength);

    //setting underscores
    var displayPara = document.getElementById("underScorePtag");
    if(valueSetFlag == false){
       
        var blankString = hiddenWord[0];
        for(var i = 1; i < hiddenLength/2; i ++){
            blankString += " " + "_" ;
        }
        displayPara.textContent = blankString;
        // console.log("hidden length/2 is:", hiddenLength/2);
    }
   
    displayPara.style.fontSize = "28px";


    function displayOperations(){
       displayCount ++;
       var blankStringForOperation = "";
       var enteredLetter = event.target.textContent;
       var newArray = [];
       var currentText = displayPara.textContent;
       console.log("current Text is:",currentText);

       console.log(enteredLetter);
       if(isFound(enteredLetter)){
            for(var m = 0; m < currentText.length; m ++){
                newArray.push(currentText[m]);
            }
            console.log(newArray);
            if(bufferArray.indexOf(enteredLetter) == -1){
                bufferArray.push(enteredLetter);
                for(var i = 0; i < hiddenWord.length; i ++){
                    if(hiddenWord[i] == enteredLetter){
                        newArray[i] = enteredLetter;
                    }
                    else{
                        continue;
                    }
                }
            }
            for(var m = 0; m < currentText.length; m ++){
                blankStringForOperation += newArray[m];
            }

            displayPara.textContent = blankStringForOperation;
        }
        else{
            wrongCount ++;
            var imageClass = document.getElementById("imageClass");
            console.log(imageClass.childNodes[1]);
            var imageItem = imageClass.childNodes[1];
            //imageItem.remove();
            // imageClass.replaceChild(0);
            var newImage = document.createElement("img");
            newImage.setAttribute("src",imageArray[wrongCount]);
            newImage.setAttribute("id","hangImage");
            imageClass.replaceChild(newImage,imageItem);

            if(wrongCount == imageArray.length - 1){
                alert("OOPS! The Man was Hanged!");
            }


        }
        

    }
    function isFound(letter){
        var foundFlag = false;
        for(var k = 0; k < hiddenLength; k ++){
            if(letter == hiddenWord[k]){
                foundFlag = true;
            }
            else{
                continue;
            }
        }
        return foundFlag;
    }
}