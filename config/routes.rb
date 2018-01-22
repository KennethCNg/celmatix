Rails.application.routes.draw do
  root to: "static_pages#root"    
    
  resources :users, only: [:create]
  
  post '/users/verify', :to => 'users#verify'
end
