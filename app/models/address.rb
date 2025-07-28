class Address < ApplicationRecord
  has_many :properties

  validates :coutry, presence: true
  validates :state, presence: true
  validates :uf, presence: true
  validates :city, presence: true
  validates :district, presence: true

  def full_address
    "#{coutry}, #{state}, #{uf}, #{city}, #{district}, #{street}, #{number}, #{complement}".strip
  end
end
