Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    # resources :users, only: :create do
    #   resources :posts, only: [:index]
    # end

    # resources :posts, only: [:show] do
    #   resources :comments, only: [:index]
    # end

    resource :session, only: [:show, :create, :destroy]
    resources :posts
    resources :comments
    resources :likes, only: [:index, :show, :create, :destroy]
  end

  get '*path', to: 'static_pages#frontend'
end
