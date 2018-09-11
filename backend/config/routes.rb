Rails.application.routes.draw do
    resources :users, only: [:index, :create, :show, :destroy]
    resources :matchmakings, only: [:index, :create, :show, :destroy]
    resources :matches, only: [:index, :create, :show, :update, :destroy]

    post "users/:id/join", to: "users#join_game"
end
