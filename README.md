# DebugConsoleUtils
A JavaScript debugging class that provides a minimal set of functions which aid in making the JavaScript console debugging more fun.

It encompases only six functions that help us to:
- output a starting debugging session header to the console
- output an ending separator for the currently debugging session
- output a string|object to the output console, optionally showing the envet's timestamp
- output the entry and exiting points into/from a function; all the outputs between these two are automatically idented
- get the current identation level

### Sample output:
<img src="http://i64.tinypic.com/jzjw61.jpg" border="0">

### How to use
The `start()` and `finish()` functions will output the START and the ELAPSED time followed by a horizontal line separator. They are very useful because  they allow you to enclose your session debugging outputs within a delimited block.

The `log_onbegin()` and `log_onend()` functions should normally be used at the beginning respectively before the end of a function definition. All the subsequent output enclosed between these to delimiter functions will be automatically idented (after each call of `log_onbegin()`) and unidented (after each call of `log_onend()`).

For outputing a string or an object you may use the `log()` function.

To find out the current nesting level you may use the `nestLevel()` function.

### Usage example
```javascript
var dbg = new DebugConsoleUtils(on_debug_mode()); // initialize the object
dbg.start(); // output the START of the debugging session

// use our debugging console utility while debugging some functions
function outer_function() {
  dbg.log_onbegin(arguments.callee.toString()); // output the outer function group header
  var inner_function = function(some_arg) {
    dbg.log_onbegin(arguments.callee.toString()); // inner group header
    dbg.log('processing the ' + some_arg); // some inner output
    dbg.log_onend(arguments.callee.toString()); // inner group footer
    return true;
  }
  dbg.log('testing the inner function'); // some outer output
  var result = inner_function();
  dbg.log('inner function result=' + result); // more outer output
  dbg.log_onend(arguments.callee.toString()); // output the outer function group footer
}

dbg.log('some dummy string output'); // sending a string to the debugging console
dbg.log(new Date()); // sending an Object to the debugging console
dbg.log('testing the outer function');
outer_function();

dbg.finish(); // output the end of the debugging session
```