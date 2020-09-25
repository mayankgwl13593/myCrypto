var key_Size = 128;
var rawJsonBoolean = true;
document.getElementById("Key_p").textContent = "Key";
document.getElementById("json-div").style.display = "none";
document.getElementById('outputText').style.display = "block";
document.getElementById("rawparseJson").innerHTML = "Raw Json";
document.getElementById("error_decryptId").style.display = "none";

function encryptJSON() {

    document.getElementById("json-div").style.display = "none";
    document.getElementById('outputText').style.display = "block";

    var key = CryptoJS.enc.Utf8.parse(document.getElementById("key").value);
    var iv = CryptoJS.enc.Utf8.parse(document.getElementById("key").value);

    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(document.getElementById("inputText").value), key,
        {
            keySize: key_Size / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    var encoded = btoa(encrypted);
    document.getElementById("outputText").value = atob(encoded);
    document.getElementById("rawparseJson").disabled = true;

}
function decryptJSON() {
    //eyJ0eXAiOiJKV1Qi
    document.getElementById("json-div").style.display = "block";
    document.getElementById('outputText').style.display = "none";
   

    try {
         document.getElementById("error_decryptId").style.display = "none";
        encrypted = document.getElementById("inputText").value;
        var key = CryptoJS.enc.Utf8.parse(document.getElementById("key").value);
        var iv = CryptoJS.enc.Utf8.parse(document.getElementById("key").value);

        let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            keySize: key_Size / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        document.getElementById("outputText").value = decrypted.toString(CryptoJS.enc.Utf8);
    }
    catch(e){
       // document.getElementById("error_decryptId").style.display = "block";
        alert('Seems like either you did enter the invalid key or input is wrong.');
       console.log(e)
    }
  
    let editor = new JsonEditor('#json-display', getJson());
    editor.load(getJson());

    if (document.getElementById("outputText").value != null)
        document.getElementById("rawparseJson").disabled = false;

}
function getJson() {
    try {
        return JSON.parse($('#outputText').val());
    } catch (ex) {
        console.log(ex);
        document.getElementById("json-div").style.display = "none";
        document.getElementById('outputText').style.display = "block";
       // document.getElementById("error_decryptId").style.display = "block";
         alert('Seems like either you did enter the invalid key or input is wrong.');
    }
}
function beautify() {

    document.getElementById("json-div").style.display = "block";
    document.getElementById('outputText').style.display = "none";
    let editor = new JsonEditor('#json-display', getJson());
    editor.load(getJson());
}
function rawJson() {
    if (rawJsonBoolean) {
        rawJsonBoolean = false;
        document.getElementById("rawparseJson").innerHTML = "Parse Json";
        document.getElementById("json-div").style.display = "none";
        document.getElementById('outputText').style.display = "block";
    }
    else {
        rawJsonBoolean = true;
        document.getElementById("rawparseJson").innerHTML = "Raw Json";
        document.getElementById("json-div").style.display = "block";
        document.getElementById('outputText').style.display = "none";
    }

}
function swap() {

    document.getElementById("json-div").style.display = "none";
    document.getElementById('outputText').style.display = "block";

    var swap_value = document.getElementById("outputText").value;
    try {
        let value = JSON.parse(swap_value);
        document.getElementById("rawparseJson").disabled = true;
    }
    catch (e) {
        document.getElementById("rawparseJson").disabled = false;
    }
    document.getElementById("outputText").value = document.getElementById("inputText").value;
    document.getElementById("inputText").value = swap_value;

}
function editor() {
    var copyText = document.getElementById("outputText");
    copyText.select();
    document.execCommand("copy");
    window.open('https://jsoneditoronline.org/', "_blank");
}
function keySize(keysize1) {
    document.getElementById("key").value = keysize1;
}
