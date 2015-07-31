This is the source that generates [allunicode.info](http://allunicode.info). The site is fully static, with the search feature implemented in client-side JavaScript. To generate a local copy of the site, do the following:

Install [Hugo](http://gohugo.io/).

Download [the latest UnicodeData.txt](http://www.unicode.org/Public/8.0.0/ucd/UnicodeData.txt).

Run `python unicodedata.py UnicodeData.txt` to produce codepoints.json and the files under content/c/.

Run `hugo server --watch` to run a local development server.


allunicode.info - A static website listing all Unicode codepoints.

Written in 2015 by Ted Mielczarek <ted@mielczarek.org>

To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.

You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
