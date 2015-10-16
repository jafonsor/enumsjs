function Enumerator(each, size) {
  this.map = function(mapfun) {
    return new Enumerator(function(fun) {
      each(function(n) {
        fun(mapfun(n));
      });
    }, size);
  };

  this.filter = function(condfun) {
    return new Enumerator(function(fun) {
      each(function(n) {
        if(condfun(n))
          fun(n);
      });
    }, size);
  };

  this.with_index = function(fun) {
    return new Enumerator(function(eachfun) {
      var index = 0;
      each(function(n) {
        eachfun(fun(n,index));
        index++;
      });
    }, size);
  };

  this.collect = function() {
    var result = (size)? new Array(size) : [];
    each(function(n) {
      result.push(n);
    });
    return result;
  };
}

function times(n,fun) {
  if(!fun) {
    return new Enumerator(function(fun) {
      times(n,fun);
    })
  }
  for(var i = 0; i < n && n >= 0; i++) {
    fun(i);
  }
}

function ary(array) {
  return times(array.length).map(function(index) {
    return array[index];
  });
}
var result = times(5).filter(function(n) { return n % 2 == 0; }).map(function(n) {return 2*n}).with_index(function(n,index) { return [n,index]; }).collect();
