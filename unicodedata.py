#!/usr/bin/env python

import codecs
import datetime
import json
import re
import string
import sys

def main():
    total = 0
    codepoints = []
    now = datetime.datetime.now().isoformat()
    with codecs.open(sys.argv[1], 'rb', 'utf_8') as f:
        first = 0
        last = None
        collect = []
        for line in f:
            bits = line.split(';')
            if bits[2] == 'Co':
                # Skip private use stuff
                continue
            cp = bits[0]
            codepoint = int(cp, 16)
            name = bits[1]
            old_name = bits[10]
            if old_name and name == '<control>':
                name = old_name
            slug = 'U{codepoint}_{name}'.format(codepoint=cp,
                                                name=name.replace(' ', '_'))
            with codecs.open('content/c/%s.md' % slug, 'wb', 'utf_8') as m:
                m.write(u'''+++
title = "U+{codepoint}\u2014{name}"
codepoint = "{codepoint}"
+++
'''.format(
    date=now,
    codepoint=cp,
    name=name,
))

            # Collect into unbroken ranges.
            if last is not None and codepoint != last+1:
                codepoints.append([first, collect])
                collect = []
                first = codepoint
            last = codepoint
            collect.append(name)
        codepoints.append([first, collect])
    with open('static/codepoints.json', 'wb') as cf:
        json.dump({'codepoints': codepoints}, cf)

if __name__ == '__main__':
    main()
