class Category < ApplicationRecord
  validates :category_name, presence: true, length: { maximum: 20 }, uniqueness: true
end
