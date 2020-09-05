window.onload = startup;


function startup() {
    //creating main element
    var mainElement = document.createElement("main");
    
    //appending main element to html body
    var body = document.querySelector("body");
    body.appendChild(mainElement);

    //creates the paragraph
    var theParagraph =  document.createElement("p");

    //adding innerHTML to the paragraph
    theParagraph.innerHTML = "Jeg trener på JavaScript";

    //create class for the paragraph
    theParagraph.className = "paragraphClassName";

    //appending the paragraph to body element
    mainElement.appendChild(theParagraph);

    //creating select element
    var selectContainer = document.createElement("select");

    //creates a objekt to populate the select element
    var selectData = [{option: 1, dd: "quit"},{option: 2, dd: "keep going"}, {option: 3, dd: "exhausted"}];

    //populating the select element with options
    var val = 1;

    for(var x = 0; x < selectData.length; x++) {
        let selectOption = document.createElement("option");
        selectOption.innerHTML = selectData[x].dd;
        selectOption.value = val++;
        selectContainer.appendChild(selectOption);
    }

    //appending select element to main
    mainElement.append(selectContainer);

    //center the select element and setting max-width
    selectContainer.style.position = "absolute";
    selectContainer.style.top = "50%";
    selectContainer.style.left = "50%";
    selectContainer.style.translate = "(-50%, -50%)";
    selectContainer.style.maxWidth = "500px";

    //creating test and reset buttons
    var test = document.createElement("button");
    var reset = document.createElement("button")

    test.innerHTML = "test";
    reset.innerHTML = "reset";

    //append buttons to main element
    mainElement.appendChild(test);
    mainElement.appendChild(reset);

    //making eventlisteners for the buttons
    var print = "";

    var utskrift = document.createElement("p");
    utskrift.className = "utskrift";
    mainElement.appendChild(utskrift);  

    //slicing and reversing strings and prints to new paragraph
    test.addEventListener("click", function(event) {
        for(let x = 0; x < selectData.length; x++) {
            let strengen = selectData[x].dd;
            let slicedStreng = strengen.slice(1);
            let reversertStreng = slicedStreng.split("").reverse();
            
            for(let i = 0; i < reversertStreng.length; i++) {
                print += reversertStreng[i];
            }

            print += " ";

            utskrift.innerHTML = print.split(",");
        }
    });
    
    var list = document.createElement("ul");
    mainElement.appendChild(list);

    var delete1;
    var delete2; 
    var delete3; 
    var delete4; 

    function createListPoints() {
        for(let x = 0; x < 4; x++) {
            let listPoint = document.createElement("li");
            let btn = document.createElement("button");
            btn.innerHTML = "Delete";
            btn.id = "deleteBtns" + x;
            listPoint.appendChild(btn);
            list.appendChild(listPoint);
        }

        delete1 = document.getElementById("deleteBtns0");
        delete2 = document.getElementById("deleteBtns1");
        delete3 = document.getElementById("deleteBtns2");
        delete4 = document.getElementById("deleteBtns3");
    }

    function createOnclicks() {
        delete1.onclick = function(event) { event.target.parentElement.remove()};
        delete2.onclick = function(event) { event.target.parentElement.remove()};
        delete3.onclick = function(event) { event.target.parentElement.remove()};
        delete4.onclick = function(event) { event.target.parentElement.remove()};
    }

    createListPoints();
    createOnclicks();

    //deleting the list point one by one
    reset.addEventListener("click", function(event) {
        createListPoints();
        createOnclicks();   
    });
}