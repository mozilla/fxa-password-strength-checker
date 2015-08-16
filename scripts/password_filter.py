import re
import sys

all_digits_regex = re.compile('^\d+$')
def is_all_digits(password):
    return all_digits_regex.match(password)

all_alpha_regex = re.compile('^[a-zA-Z]+$')
def is_all_alpha(password):
    return all_alpha_regex.match(password)

def password_filter(src, dest):
        pw_set = set([])

	with open(src, 'r') as f:
            for line in f:
                # Several checks are done before the bloom filter is called:
                #   1. password < 8 chars
                #   2. all letters & password < 12 chars
                #   3. all numbers & password < 12 chars
                #
                # If a member of any of these sets, it does not need to be
                # a part of the filter.
                #
                # So, to be part of the set:
                #   1. if password >= 8 chars.
                #   2. if password <= 11 chars.
                #   3. password is not all letters.
                #   4. password is not all numbers.

                password = line.strip()
                length = len(password)
                if length < 8:
                    continue
                elif length > 11:
                    continue
                elif is_all_digits(password):
                    continue
                elif is_all_alpha(password):
                    continue
                else:
                    pw_set.add(password)



	print len(pw_set)
	with open(dest, 'w') as f1:
		for password in pw_set:
			f1.write("%s\n"%password)

if len(sys.argv) < 3:
    print "Usage: python password_filter.py <source> <dest>"
    sys.exit(1)

source_filename = sys.argv[1]
dest_filename = sys.argv[2]

password_filter(source_filename, dest_filename)
