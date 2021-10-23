class Api::V1::UsersController < ApplicationController

  def show
  end

  def create
    user = User.new(user_params)
    if user.save
      login user
      render json: { user: user.select_column }, status: 200
    else
      render json: { error: 'ユーザー登録失敗しました。' }, status: :unprocessable_entity
    end
  end

  def all
    categories = Category.all
    if categories.present?
      shoplists = ShopList.all
      if shoplists.present?
        category_shoplists = CategoryShopList.all
        render json: { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists }, stauts: 200
      else
        render json: { categories: categories, shoplists: [] }, stauts: 200
      end
    else
      render json: { message: 'カテゴリを作成してください。'}, status: 400
    end
  end

  private
    def user_params
      params.permit(:last_name, :first_name, :email, :password, :password_confirmation)
    end
end
