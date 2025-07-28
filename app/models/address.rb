class Address < ApplicationRecord
  has_many :properties

  def full_address
    "#{coutry}, #{state}, #{uf}, #{city}, #{district}, #{street}, #{number}, #{complement}".strip
  end
end
