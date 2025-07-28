#!/usr/bin/ruby

NUMBER_NAME_DICT = [
  %w[zero one two three four five six seven eight nine teen eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen],
  %w[ _ _ twenty thirty forty fifty sixty seventy eighty ninet],
  "hundred",
  "thousand",
  "",
  ""
]

def number_to_name(number)
  number_str = String(number)
  number_name = ""
  cursor = 0;

  return NUMBER_NAME_DICT[0][number] if number < 20

  last_number = Integer(number_str[-2..-1])
  cursor = number_str.size() -1
  lt20 = false
  lt20_string = ""

  if last_number < 20
    lt20_string = NUMBER_NAME_DICT[0][Integer(number_str[-2..-1])]
    lt20 = true
  end

  number_str.reverse!
  while cursor >= 0
    char = number_str[cursor]
    if lt20 and cursor < 2
      number_name = number_name + " " + lt20_string
    elsif NUMBER_NAME_DICT[cursor].is_a?(String)
      number_name = number_name + " " + NUMBER_NAME_DICT[0][Integer(char)]
      number_name = number_name + " " + NUMBER_NAME_DICT[cursor]
    else
      number_name = number_name + " " + NUMBER_NAME_DICT[cursor][Integer(char)]
    end
    cursor -= 1
  end

  return number_name.strip
end

print "Enter a number: "
input = gets

puts("Name of number is: #{number_to_name(input.to_i)}")