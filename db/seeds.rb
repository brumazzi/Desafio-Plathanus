# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create Tags

[
  ["fa-solid fa-bed", "Bed Room", ""],
  ["fa-solid fa-bath", "Bath Room", ""],
  ["fa-solid fa-kitchen-set", "Kitchen", ""],
  ["fa-solid fa-tv", "Living Room", ""],
  ["fa-solid fa-car", "Garage", ""],
  ["fa-solid fa-shop", "Market", "Close to the market"],
  ["fa-solid fa-tree", "Pakt", "Close to the park"],
  ["fa-solid fa-building", "Bank", "Close to the bank"],
  ["fa-solid fa-basketball", "Sports court"],
  ["fa-solid fa-bus", "Close to the bus stop"]
].each do |tag_data|
  if Tag.find_by(icon: tag_data[0]).nil?
    Tag.create(icon: tag_data[0], name: tag_data[1], tooltip: tag_data[2])
  end
end

address_states = [
  ["Santa Catarina", "SC"],
  ["São Paulo", "SP"],
  ["Chapeco", "SC"],
  ["Curitiba", "PR"]
]

address_cities = [
  "Florianopolis",
  "São Paulo",
  "Chapeco",
  "Curitiba"
]

# register users
if User.count.zero?
  [*1..6].each do |user_index|
    user = User.create(email: "user_#{user_index}@gmail.com", password: "123456", full_name: "User Number #{user_index}")

    [*1..10].each do |property_index|
      address = Address.create(
                        coutry: "Brasil",
                        state: address_states[property_index%4][0],
                        uf: address_states[property_index%4][1],
                        city: address_cities[property_index%4],
                        district: "Bairro #{user_index}_#{property_index}",
                        street: "Rua #{user_index}_#{property_index}",
                        number: "#{user_index}#{property_index}",
                        complement: ""
      )
      property = Property.new(
        title: "House from #{user.full_name}",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum beatae vitae provident sequi adipisci optio natus repudiandae doloremque delectus commodi error repellat consectetur, unde expedita quas iure totam aliquam? Iure.",
        price: 413.72*property_index/user_index*3,
        identify: "",
        active: true,
        address: address,
        user: user
      )

      if property.valid?
        property.save
        [*0..rand()*10].each do |rand_index|
          PropertyTag.create_or_find_by(property: property, tag_id: (rand_index+1))
        end
      else
        property.errors.each do |err|
          puts err.full_message
        end
      end
    end
  end
end

index = 0

Property.all.each do |property|
  f1 = File.open("photos/house/#{index}_00001_.png")
  f2 = File.open("photos/bedroom/#{index}_00001_.png")
  f3 = File.open("photos/kitchen/#{index}_00001_.png")
  f4 = File.open("photos/living-room/#{index}_00001_.png")

  property.images.attach(io: f1, filename: "house-#{index}.png", content_type: 'image/png')
  property.images.attach(io: f2, filename: "bedroom-#{index}.png", content_type: 'image/png')
  property.images.attach(io: f3, filename: "kitchen-#{index}.png", content_type: 'image/png')
  property.images.attach(io: f4, filename: "living-room-#{index}.png", content_type: 'image/png')

  index += 1
end