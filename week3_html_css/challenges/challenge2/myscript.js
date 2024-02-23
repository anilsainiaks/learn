function toggleMenu(){
    let menuList=document.getElementById("navigationOptionsList");
    // menuList.style.maxHeight="0px";

    if(menuList.style.maxHeight=="0px"){
        menuList.style.maxHeight="130px";
    }else{
        menuList.style.maxHeight="0px";
    }
}

