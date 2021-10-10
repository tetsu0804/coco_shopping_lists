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

  private
    def user_params
      params.permit(:last_name, :first_name, :email, :password, :password_confirmation)
    end
end
