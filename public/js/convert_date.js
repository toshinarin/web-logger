document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll('.date');
    for (var i = 0, l = elems.length; i < l; i++) {
        var elem = elems[i];
        var d = new Date(parseInt(elem.innerText, 10))
        var ds = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
        elem.innerText = ds
    }
});
