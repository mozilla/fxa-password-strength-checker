import re
def password_filter(src, dest, regex):
	pattern = re.compile(regex)
	pw_list = []
	with open(src, 'r') as f:
		for line in f:
			m = re.match(pattern, line)
			if(m):
				print m.group(1)
				pw_list.append(m.group(1))
	print len(pw_list)
	with open(dest, 'w') as f1:
		for line in pw_list:
			f1.write("%s\n"%line)

# password_filter('crackstation-human-alpha-num-spec.txt', 'human-ans-shorter.txt' ,'^((?:.*[!@#$%^&*()_+]{0,1})[A-Za-z\d ]{7,11})$')
