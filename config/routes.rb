Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :image_links, path: 'image-links'
    resources :feedbacks
  end

  root 'react#app'
  match '*path', to: 'react#app', via: :get
end
