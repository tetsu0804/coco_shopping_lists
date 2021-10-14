class AddIndexToCategoriesCategoryName < ActiveRecord::Migration[5.2]
  def change
    add_index :categories, :category_name, unique:true
  end
end
