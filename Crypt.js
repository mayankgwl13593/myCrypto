var key_Size = 128;
document.getElementById("Key_p").textContent = "Key";
function encryptJSON() {

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
    if (document.getElementById("outputText").value != null)
        document.getElementById("beautify").disabled = false;

}
function beautify() {
    document.getElementById("outputText").value = JSON.stringify(JSON.parse(document.getElementById("outputText").value), null, 2)
}
function swap() {
    var swap_value = document.getElementById("outputText").value;
    document.getElementById("outputText").value = document.getElementById("inputText").value;
    document.getElementById("inputText").value = swap_value;

}
function keySize(keysize1) {
    document.getElementById("key").value = keysize1;
}
function editor() {
    var copyText = document.getElementById("outputText");
    copyText.select();
    document.execCommand("copy");
    window.open('https://jsoneditoronline.org/', "_blank");




}
