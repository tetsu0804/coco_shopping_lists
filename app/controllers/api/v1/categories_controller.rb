class Api::V1::CategoriesController < ApplicationController

  def index
    categories = Category.all
    if categories.present?
      render json: { categories: categories }, stauts: 200
    else
      render json: { message: 'カテゴリを作成してください。'}, status: 400
    end
  end

  def create
    user = User.find(params[:user_id])
    category = user.categories.build(category_name: params[:category_name])

    if category.save
      render json: { category: category}, status: 200
    else
      render json: { message: 'カテゴリ作成失敗しました。'}, status: 400
    end
  end

  def update
    category = Category.find(params[:id])
    if !category.nil?
      if category.update_attribute(:category_name, params[:category_name])
        render json: { category: category }, status: 200
      else
        render json: { message: '編集失敗しました。もう一度入力してください。'},status: 400
      end
    else
      render json: { message: '編集できませんでした。もう一度入力ください。'}, status: 400
    end
  end

  def destroy
    Category.find(params[:id]).destroy
    head :no_content
  end
end
