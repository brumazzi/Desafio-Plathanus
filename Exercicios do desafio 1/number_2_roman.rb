#!/usr/bin/ruby

def part_check(number, minor, major, extra)
  if number <= 3
    return minor*number
  elsif number == 4
    return minor+major
  elsif number < 9
    return major+(minor*(number-5))
  else
    return minor+extra
  end
end

def number_2_roman(number)
  output = ""

  if number >= 4000
    return ""
  end

  if number >= 1000 and number <= 3000
    first_part = Integer(String(number)[0])
    output += "M"*first_part
    number -= first_part*1000
  end

  if number >= 100
    first_part = Integer(String(number)[0])
    output += part_check(first_part, "C", "D", "M")
    number -= first_part*100
  end

  if number >= 10
    first_part = Integer(String(number)[0])
    output += part_check(first_part, "X", "L", "C")
    number -= first_part*10
  end

  if number >= 1
    first_part = Integer(String(number)[0])
    output += part_check(first_part, "I", "V", "X")
  end

  return output
end

print "Enter a number: "
input = gets

puts("Roman number is: #{number_2_roman(input.to_i)}")