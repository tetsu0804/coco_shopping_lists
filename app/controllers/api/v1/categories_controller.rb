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
    category = Category.new(category_name: params[:category_name])
    if category.save
      render json: { category: category}, status: 200
    else
      render json: { message: 'カテゴリ作成失敗しました。'}, status: 400
    end
  end
end
