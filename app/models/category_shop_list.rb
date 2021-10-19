class CategoryShopList < ApplicationRecord
  belongs_to :category
  belongs_to :shop_list
end
