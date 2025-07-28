class Property < ApplicationRecord
  belongs_to :user
  belongs_to :address

  has_many_attached :images
  has_many :property_tags
  has_many :tags, through: :property_tags

  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }

  validate :limit_images

  def full_address
    "#{self.address.try :full_address} #{identify}".strip
  end

  def cover
    if images
      return images.first
    else
      return nil
    end
  end

  def limit_images
    if images.count > 4
      errors.add(:images, "não podem ser mais de 3 imagens")
    end
  end

end
