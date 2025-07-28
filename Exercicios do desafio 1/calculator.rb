#!/usr/bin/ruby

def calculator(expression)
  dataList = expression.scan(/\d+|[\+\-\*\/]/).map { |token| token.match?(/\d+/) ? token.to_f : token }

  return "Invalid expression!" if dataList.size() < 3

  index = 0
  return "Invalid expression!" if dataList[0] in ["+", "*", "/"] or dataList[dataList.size-1] in ["+", "*", "/", "-"]
  if dataList[0] == '-'
    dataList[1] = -dataList[1]
    dataList.delete_at(0)
  end

  # invert negative values
  while index < dataList.size - 1
    if dataList[index] == '-'
      return "Invalid expression!" if not dataList[index+1].is_a?(Float)
      dataList[index+1] = -dataList[index+1]
      dataList[index] = '+' # invert signal
    end

    index += 1
  end

  # make multiply and division first
  index = 0
  while index < dataList.size - 1
    if dataList[index] == '/'
      return "Invalid expression!" if dataList.size() -1 == index
      dataList[index] = dataList[index-1]/dataList[index+1]
    elsif dataList[index] == '*'
      return "Invalid expression!" if dataList.size() -1 == index
      dataList[index] = dataList[index-1]*dataList[index+1]
    else
      index += 1
      next
    end

    dataList.delete_at(index-1)
    dataList.delete_at(index)
  end

  # apply sum and subtractions
  index = 0
  while index < dataList.size
    if dataList[index] == '+'
      return "Invalid expression!" if dataList.size() -1 == index

      dataList[index] = dataList[index-1] + dataList[index+1]
      dataList.delete_at(index-1)
      dataList.delete_at(index)
      next
    end
    index += 1
  end

  return "Invalid expression!" if dataList.size() != 1

  return dataList[0]

end

print("Enter a numeric expression: ")
input = gets
# puts(calculator("12+7-2*4/5")) # need return 17.4

puts "= #{calculator(input)}"