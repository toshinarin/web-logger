document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll('.date');
    for (var i = 0, l = elems.length; i < l; i++) {
        var elem = elems[i];
        var d = new Date(parseInt(elem.innerText, 10));
        var MM = ('0' + (d.getMonth() + 1)).slice(-2);
        var DD = ('0' + d.getDate()).slice(-2);
        var hh = ('0' + d.getHours()).slice(-2);
        var mm = ('0' + d.getMinutes()).slice(-2);
        var ds = d.getFullYear() + '/' + MM + '/' + DD + ' ' + hh + ':' + mm
        elem.innerText = ds
    }
});
