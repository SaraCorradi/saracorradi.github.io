function vai_a_destra() {
  $("#quadrato").removeClass("left");
  $("#quadrato").addClass("right");
}

function vai_a_sinistra(){
  $("#quadrato").removeClass("right");
  $("#quadrato").addClass("left");
}

function quando_clicki() {
  if($("#quadrato").hasClass("top-left")){
    $("#quadrato").removeClass("top-left")
    $("#quadrato").addClass("top-right")
  }
  else if($("#quadrato").hasClass("top-right")){
    $("#quadrato").removeClass("top-right").addClass("bottom-right")
  }
  else if($("#quadrato").hasClass("bottom-right")){
    $("#quadrato").removeClass("bottom-right").addClass("bottom-left")

  }
  else if ($("#quadrato").addClass("bottom-left")){
    $("#quadrato").removeClass("bottom-left").addClass("top-left")
  }
}
}

$("#quadrato").on("click",quando_clicki)
