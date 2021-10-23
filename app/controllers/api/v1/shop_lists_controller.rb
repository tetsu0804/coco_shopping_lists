class Api::V1::ShopListsController < ApplicationController
  def create
    category_ids = []
    shop_list_params[:categories].each do |category_id|
      if Category.exists?(category_id)
        category_ids.push(category_id)
      end
    end

    if category_ids.present?
      shoplist = ShopList.new(list_name: shop_list_params[:list_name], price: shop_list_params[:price], purchasedate: shop_list_params[:purchasedate], user_id: shop_list_params[:user_id])
      if shoplist.save
        category_ids.each do |id|
          shoplist.category_shop_lists.create(category_id: id)
        end
        render json: { shop_list: shoplist, categories: category_ids}, status: 200
      else
        render json: { message: 'もう一度フォームに入力してください。'}, status: 400
      end
    else
      render json: { message: '商品のカテゴリをチェックしてください。カテゴリ項目が無ければ作成してください。'}, status: 400
    end
  end

  private

    def shop_list_params
      params.permit(:list_name, :price, :purchasedate, :user_id, { categories: []})
    end
end
