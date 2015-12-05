String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
};

String.prototype.isContain = function (find) {
    return this.indexOf(find) !== -1;
};

String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}
