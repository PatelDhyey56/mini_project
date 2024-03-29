var lenguages =  document.getElementsByClassName("lenguage");
var lenguage_disc=document.getElementsByClassName("lenguage-disc");
var box =document.getElementById("row");
var id ="Wordpress"
const load=()=>{
    lenguages[0].setAttribute("id", "lenguage-click");
    lenguage_disc[0].style="display:block";
}
const clickfunc = (e,click_id)=>{
    document.getElementById("lenguage-click").removeAttribute("id");
    let old_text=document.getElementById(id);
    old_text.style="display:none";
    id=click_id;
    let new_text=document.getElementById(click_id);
    // console.log(old_text);

    new_text.style="display:block";
    e.setAttribute("id", "lenguage-click");
}
const scrollleft=()=>{
    // box.scrollLeft+=300;
    box.scrollBy({
        left:+300,behavior:"smooth"
    })
}   
const scrollright =()=>{
    box.scrollBy({
        left:-300,behavior:"smooth"
    })
}