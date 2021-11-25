import re

def arithmethic_arranger(probs, answers = False):
	first_row= []
	second_row= []
	third_row = []
	fourth_row = []
	if len(probs) > 5:
		return "Error: Too many problems."
		quit()

	for prob in probs:
		parts = prob.split()
		f_operand = parts[0]
		s_operand = parts[2]
		operator = parts[1]

		f_test = re.search(r'\D', f_operand) != None
		s_test = re.search(r'\D', s_operand) != None
		o_test = re.match(r'[^+-]', operator)!= None

		if f_test or s_test:
			return "Error: Numbers must only contain digits."
			quit()

		if o_test:
			return "Error: Operator must be '+'' or '-'."
			quit()

		#Getting the various lengths
		f_length = len(f_operand)
		s_length = len(s_operand)

		if f_length > 4 or s_length > 4:
			return "Error: Numbers cannot be more than four digits."
			quit()

		num_length = f_length if f_length > s_length else s_length
		dash_length = 2 + num_length

		#Calculating
		if operator == '+':
			result = int(f_operand) + int(s_operand)
		else:
			result = int(f_operand) - int(s_operand)

		first_row.append("{0:{l}d}".format(int(f_operand), l=dash_length))
		second_row.append("{0} {1:{l}d}".format(operator, int(s_operand),l=num_length))
		third_row.append(dash_length*"-")
		fourth_row.append("{0:{l}d}".format(result, l=dash_length))

	f = "    ".join(first_row)
	s = "    ".join(second_row)
	t = "    ".join(third_row)
	r = "    ".join(fourth_row)

	if answers:
		arranged_problems = "{}\n{}\n{}\n{}".format(f,s,t,r)
	else:
		arranged_problems = "{}\n{}\n{}".format(f,s,t)

	return arranged_problems



print(arithmethic_arranger(["32 + 8", "1 + 3861", "9999 + 9999", "523 - 49", "1 + 1"], True))





