class Category < ApplicationRecord
  validates :category_name, presence: true, length: { maximum: 20 }, uniqueness: true

  def select_column
    return { id: self.id, category_name: self.category_name }
  end
end
