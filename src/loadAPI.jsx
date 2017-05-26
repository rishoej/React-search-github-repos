function loadAPI(api,callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', api, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
        var json = JSON.parse(xobj.responseText);
        callback(json);
    }
  };
  xobj.send(null);
}

export default loadAPI;
