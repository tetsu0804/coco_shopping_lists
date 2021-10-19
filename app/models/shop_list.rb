class ShopList < ApplicationRecord
  belongs_to :user
  validates :list_name, presence: true, length: { maximum: 50 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :purchasedate, presence: true
  validates :user_id, presence: true
  has_many :category_shop_lists, dependent: :destroy
  has_many :categories, through: :category_shop_lists, source: :category
end
