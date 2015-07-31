Install [Hugo](http://gohugo.io/).

Download [the latest UnicodeData.txt](http://www.unicode.org/Public/8.0.0/ucd/UnicodeData.txt).

Run `python unicodedata.py UnicodeData.txt` to produce codepoints.json and the files under content/c/.

Run `hugo server --watch` to run a local development server.
