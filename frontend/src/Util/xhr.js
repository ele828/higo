export default function ajax(url, options) {
    var dataResult;
    if (typeof(options.data) === 'object') {
        var str = '';
        for (var c in options.data) {
            str = str + c + '=' + options.data[c] + '&';
        }
        dataResult = str.substring(0, str.length - 1);
    }
    options.type = options.type || 'GET';
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(options.type, url);
    if (options.type == 'GET') {
        xhr.send(null);
    } else {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        try {
          xhr.send(dataResult);
        } catch (e) {
          console.log(e);
        }
    }

    // readyState
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                options.onsuccess && options.onsuccess(xhr.responseText, xhr.responseXML);
            } else {
                options.onfail && options.onfail();
            }
        }
    };
}