Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post '/signup', controller: :users, action: :create
      post '/login', controller: :sessions, action: :create
      delete '/logout', controller: :sessions, action: :destroy
      get '/users', controller: :users, action: :show
      post '/category', controller: :categories, action: :create
      get '/category', controller: :categories, action: :index
      patch '/category/:id', controller: :categories, action: :update
      delete '/category/:id', controller: :categories, action: :destroy
    end
  end
end
