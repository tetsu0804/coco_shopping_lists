class Api::V1::SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      login user
      params[:remember_me] === '1' ? remember(user) : forget(user)
      render json: { user: user.select_column }, status: 200
    else
      render json: { error: 'ログインに失敗しました。' }, status: :unprocessable_entity
    end
  end

  def destroy
    logout if loggedIn?
    head :no_content
  end
end
