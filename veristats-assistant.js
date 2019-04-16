// ==UserScript==
// @name         Veristats assistant
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ameed Sayeh
// @match        http://veristats/version.html?&driver_version=OFED-internal*
// @match        http://10.134.4.12/version.html?&driver_version=OFED-internal*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //
    setInterval(reloadCheckboxes,2000);



function reloadCheckboxes() {

    var sessionIndex = 0
    var thead = document.getElementsByTagName("thead")[0];
    var rheads = thead.getElementsByTagName("th");
    for (var i=0; i<rheads.length; i++) {
        if (rheads[i].innerText == "Session (MARS)") {
            sessionIndex = i;
            break;
        }
    }

    var odds = document.getElementsByClassName("odd")
    var evens = document.getElementsByClassName("even")
    var sessionNum,val,checkfield

    for (i = 0; i < odds.length; i++) {

        if (!odds[i].getElementsByTagName("td")[0].classList.contains("check-field")) {


            odds[i].getElementsByTagName("td")[0].classList.add("check-field")

            odds[i].getElementsByTagName("td")[0].addEventListener("dblclick",(event)=> {
                var ip = event.target.innerText
                ip = ip.split("_")[0]

                copyStringToClipboard(ip)
            })

            sessionNum = odds[i].getElementsByTagName("td")[sessionIndex].innerText.replace("(link)","").trim()
            val = getCookie(sessionNum)
            if (!val) {
                setCookie(sessionNum,"false",7)
                val = "false"
            }


            odds[i].getElementsByTagName("td")[0].innerHTML = '<input id=' + sessionNum + ' type="checkbox">  ' + odds[i].getElementsByTagName("td")[0].innerText
            checkfield = odds[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0]
            if (val == "true") {
                checkfield.parentNode.parentNode.style = "background-color: green;"
            }
            checkfield.checked = (val == "false" ? false : true)

            checkfield.addEventListener('change',(event)=>{
                if (event.target.checked) {
                    event.target.parentNode.parentNode.style = "background-color: green;"
                }
                else {
                    event.target.parentNode.parentNode.style = "background-color: white;"
                }
                //console.log("changed to " + event.target.checked)
                setCookie(event.target.id, event.target.checked, 7)



            });

        }
    }

    for (i = 0; i < evens.length; i++) {

        if (!evens[i].getElementsByTagName("td")[0].classList.contains("check-field")) {
            evens[i].getElementsByTagName("td")[0].classList.add("check-field")

            evens[i].getElementsByTagName("td")[0].addEventListener("dblclick",(event)=> {

                var ip = event.target.innerText
                ip = ip.split("_")[0]

                copyStringToClipboard(ip)

            })
            sessionNum = evens[i].getElementsByTagName("td")[sessionIndex].innerText.replace("(link)","").trim()
            val = getCookie(sessionNum)
            if (!val) {
                setCookie(sessionNum,"false",7)
                val = "false"
            }

            evens[i].getElementsByTagName("td")[0].innerHTML = '<input id=' + sessionNum + ' type="checkbox">  ' + evens[i].getElementsByTagName("td")[0].innerText
            checkfield = evens[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0]

            if (val == "true") {
                checkfield.parentNode.parentNode.style = "background-color: green;"
            }
            checkfield.checked = (val == "false" ? false : true)

            checkfield.addEventListener('change',(event)=>{
                if (event.target.checked) {
                    event.target.parentNode.parentNode.style = "background-color: green;"
                }
                else {
                    event.target.parentNode.parentNode.style = "background-color: white;"
                }
                //console.log("changed to " + event.target.checked)
                setCookie(event.target.id, event.target.checked, 7)

            });
        }
    }

}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }
})();
