Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  # resources :users, only: [:show, :create, :destroy, :index]
  
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'

  resources :users, only: [:show, :create, :destroy, :index] do
    resources :trips, except: [:index] do 
      resources :days, only: [:index, :show, :create, :destroy] do
        resources :items, only: [:show, :create, :destroy, :index]
      end
    end
  end


end
