function fib(n) {
  if(n <= 1)
    return 1;
  else
    return fib(n-1) + fib(n-2);
}

function fib_it() {
  var last_1 = 0;
  var last_2 = 1;
  return function() {
    var next_val = last_1 + last_2;
    last_1 = last_2;
    last_2 = next_val;
    return next_val;
  }
}

function fib_lin(n) {
  if(n<1)
    return 1;

  var last_1 = 0;
  var last_2 = 1;
  for(var i = 0; i < n; i++) {
    var t = last_2;
    last_2 = last_2 + last_1;
    last_1 = t;
  }
  return last_2;
}

function fib_it_lin(n) {
  if(n<1)
    return 1;

  var aux_it = fib_it();
  for(var i = 0; i < n - 1; i++) {
    aux_it();
  }
  return aux_it();
}

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
