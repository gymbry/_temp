function Rand (len, start) {
  if ((Array.isArray(len)) || (typeof len === 'string'))
    len = len.length;
  else if (typeof len === 'object')
    len = Object.keys(len).length;
  if (start) {
    if ((Array.isArray(start)) || (typeof start === 'string'))
      start = start.length;
    else if (typeof start === 'object')
      start = Object.keys(start).length;
    if (start > len) {
      var swap = len;
      len = start;
      start = swap;
    }
  }
  
  this.used = [];
  this.backIndex = 0;
  
  this.addUsed = function (newUsed) {
    if (Array.isArray(newUsed)) {
      for (var i in newUsed) {
        if (this.used.indexOf(newUsed[i]) === -1)
          this.used.push(newUsed[i]);
      }
    }
    else if (this.used.indexOf(newUsed) === -1)
      this.used.push(newUsed);
    this.backIndex = this.used.length;
  };
  
  this.new = function () {
    if ((this.used.length !== len) && (this.backIndex === this.used.length)) {
      var myRandom = 0;
      if (!start) {
        myRandom = Math.floor(Math.random() * len);
        while (this.used.indexOf(myRandom) > -1)
          myRandom = Math.floor(Math.random() * len);
      }
      else {
        myRandom = Math.floor(Math.random() * (len - start) + start);
        while (this.used.indexOf(myRandom) > -1)
          myRandom = Math.floor(Math.random() * (len - start) + start);
      }
      this.addUsed(myRandom);
      firstBack = true;
      return myRandom;
    }
    else if (this.backIndex < this.used.length) {
      this.backIndex++;
      return this.used[this.backIndex - 1];
    }
    else if (this.used.length === len)
      return this.used[this.used.length - 1];
  };
  
  this.back = function () {
    if (this.backIndex > 1) {
      this.backIndex--;
      return this.used[this.backIndex - 1];
    }
    else if (this.backIndex === 1) {
      return this.used[this.backIndex - 1];
    }
    else if (this.used.length === 0) {
      return this.new();
    }
    else {
      return this.used[0];
    }
  };
}