Array.prototype.inArray = function (find, ignore) {
    var result = false;

    this.forEach(function (i) {console.log(i);
        if (i == find) {
            result = true;
        }

        if (ignore) {
            if (i.toLowerCase() == find.toLowerCase()) {
                result = true;
            }
        }
    });

    return result;
};
