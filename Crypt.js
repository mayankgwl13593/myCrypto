var key_Size = 128;
document.getElementById("Key_p").textContent = "Key";
document.getElementById("json-div").style.display = "none";
document.getElementById('outputText').style.display = "block";

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
    document.getElementById("beautify").disabled = true;

}
function decryptJSON() {
    //eyJ0eXAiOiJKV1Qi
    document.getElementById("json-div").style.display = "block";
    document.getElementById('outputText').style.display = "none";

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
    let editor = new JsonEditor('#json-display', getJson());
    editor.load(getJson());

    if (document.getElementById("outputText").value != null)
        document.getElementById("beautify").disabled = false;

}
function getJson() {
    try {
        return JSON.parse($('#outputText').val());
    } catch (ex) {
        console.log(ex);
        document.getElementById("json-div").style.display = "none";
        document.getElementById('outputText').style.display = "block";
    }
}
function beautify() {

    document.getElementById("json-div").style.display = "block";
    document.getElementById('outputText').style.display = "none";
    let editor = new JsonEditor('#json-display', getJson());
    editor.load(getJson());
}
function rawJson() {

    document.getElementById("json-div").style.display = "none";
    document.getElementById('outputText').style.display = "block";
}
function swap() {

    document.getElementById("json-div").style.display = "none";
    document.getElementById('outputText').style.display = "block";

    var swap_value = document.getElementById("outputText").value;
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
