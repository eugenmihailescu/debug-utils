##1. INSTALLATION
Clone this git repository: `git clone https://github.com/eugenmihailescu/debug-utils.git`

Then:
- on Unix like systems just run the `./install.sh`, it should do the rest.
- on a Windows system just follow the Linux-like commands shown on install.sh at your Windows command prompt.

#2. RUN
On Unix like system it starts automatically a built-in PHP web server on `http://localhost:3000`
You may however setup a Apache|Nginx|whatever web server by using the `debug_utils_example` directory as your web server's document root.

To start at a later time the built-in PHP web server just type the following command at your shell:
`php -S localhost:3000 -t debug_utils_example`
  
#3. FEEDBACK
Issues should be reported at https://github.com/eugenmihailescu/debug-utils/issues 