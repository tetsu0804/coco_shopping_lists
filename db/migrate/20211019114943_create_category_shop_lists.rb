class CreateCategoryShopLists < ActiveRecord::Migration[5.2]
  def change
    create_table :category_shop_lists do |t|
      t.references :category, foreign_key: true
      t.references :shop_list, foreign_key: true

      t.timestamps
    end
  end
end
