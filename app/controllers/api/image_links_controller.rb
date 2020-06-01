class Api::ImageLinksController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    render json: Api::ImageLink.all.map do |link|
      link.attributes.merge({
        location: "/view/#{link.id}",
      })
    end
  end

  def show
    render json: Api::ImageLink.find(params[:id])
  end

  def create
    permitted = params.permit(:full_url)
    return render json: {message: "Invalid request"}, status: 400 unless permitted.has_key?(:full_url)
    return render json: {message: "Link doesn't return an image"}, status: 400 unless valid_img_link?(permitted[:full_url]) 
    link = Api::ImageLink.new(permitted)
    link.save
    render json: link.attributes.merge({location: "/view/#{link.id}"}), status: 201
  end

  private
  def valid_img_link?(img_link)
    res = HTTParty.head(img_link, timeout: 3)
    res.code == 200 && res.headers['Content-Type'].start_with?('image/')
  end
end
