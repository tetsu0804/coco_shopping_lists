class CreateShopLists < ActiveRecord::Migration[5.2]
  def change
    create_table :shop_lists do |t|
      t.string :list_name, null: false
      t.integer :price, null: false
      t.datetime :purchasedate, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
