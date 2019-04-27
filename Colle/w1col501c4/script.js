var taskToMake = document.getElementById("faire");
var taskOver =  document.getElementById("finie");
var listToMake = taskToMake.children[1];
var listDone = taskOver.children[1];

var form = document.getElementById("form-task");
var error = document.getElementById("error");
var error2 = document.getElementById("error2");
var i = 0;
var fi = 0;

function verifTask() {
        
    var name = form.children[0].value;
    var description = form.children[1].value;
    
    if(name.length > 35 || name == null || name == ""){
        
        error.innerHTML = "Nom superieur a 35 caracteres !";
        return false;
    }
    
    if(description.length > 300 || description == null || description == "")
    {
        error2.innerHTML = "Description superieur a 300 caracteres !";
        return false;
    }
}

function toggleTask() {
    
    var check = verifTask();
    var name = form.children[0].value;
    var description = form.children[1].value;
    
    if(check != false)
    {   
        var li = document.createElement("li");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        var x = document.createElement("a");
        var y = document.createElement("a");
        
        h3.innerHTML = "-- " + name + " : ";
        p.innerHTML = description;
        
        x.innerHTML = "Delete task";
        x.href = "#";
        x.id = "dlt-" + i;
        x.style.marginLeft = "70%";
        x.setAttribute("onclick","dltTaskToMake(this);");
        
        y.innerHTML = "Mark as finished";
        y.href = "#";
        y.id = "mv-" + fi;
        y.style.color = "green";
        y.setAttribute("onclick","moveTask(this);");
        
        taskToMake.children[1].append(li);
        taskToMake.children[1].children[i].append(h3);
        taskToMake.children[1].children[i].append(p);
        taskToMake.children[1].children[i].append(y);
        taskToMake.children[1].children[i].append(x);
        
        i++;
        fi++;
    }
}

function moveTask(taskId) {
    
    var id = taskId.id;
    var li = taskId.parentNode;
    var h3 = taskId.parentNode.children[0];
    var p = taskId.parentNode.children[0];
    
    li.children[2].remove();
    //li.children[3].remove();
    listDone.append(li);
    
    if(i > 0)
    {
        i--;  
    }
}

function dltTaskToMake(myid) {
    
    var id = myid.id;
    myid.parentNode.remove();
    
    if(i > 0)
    {
        i--;  
    }
}

$("#button").click(function() {

    var task = $('li');

    for(i = 0; i < task.length; i++)
    {
        var taskName = task[i].children[0];
        var taskInfos = task[i].children[1];

        var values = {
            'name': taskName.innerHTML,
            'infos': taskInfos.innerHTML
        };

        $.ajax({
             data: values,
             type: "post",
             url: "send.php",
             success: function(data){
            }
        });
}

$("#charge").click(function() {
    
        $.ajax({ 
          type: "GET",
          url: "display.php",             
          dataType: "html",                 
          success: function(response){                    
              $("#responsecontainer").html(response); 
          }

      });
});

});