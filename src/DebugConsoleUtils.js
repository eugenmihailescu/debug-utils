"use strict";
/**
 * A JavaScript class that enhances the browser's console output necessary while debugging a JavaScript source code
 * 
 * @author Eugen Mihailescu <eugenmihailescux@gmail.com>
 * @license {@link https://www.gnu.org/licenses/gpl-3.0.txt|GPLv3}
 * @version 1.0
 * 
 * @class
 * @since 1.0
 * @param {boolean=}
 *            debug_mode - When false then the debugging output is inhibited
 */
function DebugConsoleUtils(debug_mode) {
    debug_mode = this.UNDEF !== typeof debug_mode ? debug_mode : true;

    /**
     * The debug message identetion level. Used to indent the debugging output after a
     * {@link DebugConsoleUtils#log_onbegin|log_onbegin} call.
     * 
     * @since 1.0
     * @default
     * @see {@link DebugConsoleUtils#log_onbegin|log_onbegin}
     * @see {@link DebugConsoleUtils#log_onend|log_onend}
     */
    var level = 0;

    /**
     * The start time when the {@link DebugConsoleUtils#start|start} function was called.
     * 
     * @since 1.0
     * @default
     * @see {@link DebugConsoleUtils#elapsed|elapsed}
     */
    var start_time = false;

    var that = this;

    /**
     * Repeat the given string by a given number of times.
     * 
     * @since 1.0
     * @private
     * @param {string}
     *            str - The input string to repeat.
     * @param {number}
     *            num - The number of times to repeat the string
     * @returns {string} Returns the given string repeated the given number of times
     */
    function repeat(str, num) {
        return new Array(num + 1).join(str);
    }

    /**
     * Outputs a horisontal separator line on the console
     * 
     * @since 1.0
     * @private
     */
    function separator() {
        level = 0;
        that.log(repeat('+-', 36), false);
    }

    /**
     * Get the number of milliseconds since the {@link DebugConsoleUtils#start|start} was called
     * 
     * @since 1.0
     * @private
     * @returns {number} Returns the number of milliseconds elapsed so far
     */
    function elapsed() {
        var t = new Date();

        start_time || (start_time = new Date());
        return t.getTime() - start_time.getTime();
    }

    /**
     * Checks if the browser support the debugging console
     * 
     * @since 1.0
     * @private
     * @returns {boolean} Returns true if the browser supports the console, false otherwise
     */
    function has_console() {
        return that.UNDEF !== typeof console && "function" === typeof console.log;
    }

    /**
     * Initializes the debugging variables and outputs a big "start" string to the console. This should be the first function
     * called when you want to start a debugging session.
     * 
     * @since 1.0
     * 
     */
    this.start = function() {
        var out = [];
        out.push('             .                          .');
        out.push('           .o8                        .o8');
        out.push(' .oooo.o .o888oo  .oooo.   oooo d8b .o888oo');
        out.push('d88(  "8   888   `P  )88b  `888""8P   888');
        out.push('`"Y88b.    888    .oP"888   888       888');
        out.push('o.  )88b   888 . d8(  888   888       888 .');
        out.push('8""888P\'   "888" `Y888""8o d888b      "888"');
        level = 0;
        that.log(out.join('\n'), false);
        separator();
        start_time = new Date();
    };

    /**
     * Outputs the total elapsed debuggin time. This function should be called when the debugging session is finished.
     * 
     * @since 1.0
     * @param {string=}
     *            str - If defined then outputs the given string before printing out the total elapsed time.
     */
    this.finish = function(str) {
        var e = elapsed();
        level = 0;

        if (that.UNDEF !== typeof str) {
            that.log(str);
        }

        that.log('ELAPSED : ' + (e > 1000 ? (e / 1000) + 's' : (e + 'ms')));

        separator();
    };

    /**
     * While on {@link DebugConsoleUtils|debug_mode} outputs the given message to the browser's console.
     * 
     * @since 1.0
     * @param {string}
     *            message - The message to output to the console
     * @param {boolean=}
     *            show_time - Whether to prefix the given message with a timestamp or not. Default to true.
     */
    this.log = function(message, show_time) {
        if (debug_mode && has_console()) {
            show_time = that.UNDEF === typeof show_time ? true : show_time;

            var prefix = elapsed() + ' ms : ';

            prefix = repeat(' ', 12 - prefix.length) + prefix;

            if (show_time) {
                prefix += repeat('\t- ', level);
            } else
                prefix = '';

            if ('object' !== typeof message) {
                console.log(prefix + message);
            } else {
                console.log(message);
            }
        }
    };

    /**
     * Outputs a function-begin header using the caller argument as the function name. The output identation is automatically
     * increased.
     * 
     * @since 1.0
     * @param {string}
     *            caller - The function name
     */
    this.log_onbegin = function(caller) {
        that.log(repeat("\t", level) + 'Entering ' + caller.replace(/([^\(]+)[\s\S]+/g, '$1'));
        level++;
    };

    /**
     * Outputs a function-exit header using the caller argument as the function name. The output identation is automatically
     * decresead.
     * 
     * @since 1.0
     * @param {string}
     *            caller - The function name
     * @param {string=}
     *            arg - When specified the outputs additionally this argument.
     */
    this.log_onend = function(caller, arg) {
        level--;
        that.log(repeat("\t", level) + 'Exiting ' + caller.replace(/([^\(]+)[\s\S]+/g, '$1')
                + (that.UNDEF !== typeof step ? '(exit #' + step + ')' : ''));
    };

    /**
     * Get the current output nesting level
     * 
     * @since 1.0
     * @returns {number} Returns the current output nesting level
     */
    this.nestLevel = function() {
        return level;
    };
}

DebugConsoleUtils.prototype.UNDEF = "undefined";