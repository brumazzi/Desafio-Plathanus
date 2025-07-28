class PropertyTag < ApplicationRecord
  belongs_to :tag
  belongs_to :property
end
