class Category < ApplicationRecord
  belongs_to :user
  validates :category_name, presence: true, length: { maximum: 20 }, uniqueness: true
  has_many :category_shop_lists, dependent: :destroy
  has_many :shoplists, through: :category_shop_lists, source: :shop_list
  def select_column
    return { id: self.id, category_name: self.category_name }
  end
end
