Number.prototype.isBi = function() {
  if ((this%4 == 0 && this%100 != 0) || this%400 == 0) {
    return true;
  }
}

Number.prototype.isInInter = function(min, max) {
  return min<=this && this <= max;
}

function nbJours(m, a) {
  switch (m) {
    case 2:
    return (a.isBi() ? 29 : 28);
    break;

    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
    return 31;
    break;

    case 4:
    case 6:
    case 9:
    case 11:
    return 30;
    break;
  }
}

function twoInt(n) {
  if (typeof n == "number") {
    var s = "" + n;
    if (s.length < 2) {
      s = "0" + s;
    } else if (s.length > 2){
      s = s.substr(s.length-2, s.length);
    }
    return s;
  }
}

function todayDate() {
  var d = new Date();
  var s = twoInt(d.getDate()) + "/" + twoInt(d.getMonth()) + "/" + d.getFullYear();
  return s;
}

function isDate(s) {
  var reg = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
  if (reg.test(s)) {
    var test = s.split("/");
    var date = parseInt(test[0]);
    var mois = parseInt(test[1]);
    var annee = parseInt(test[2]);
    if (mois.isInInter(1, 12) && date.isInInter(1, nbJours(mois, annee))) {
      return true;
    }
    return false;
  }
}

function putDateOnPrevSib() {
  $().
}
