module Api
  class ImageLinksController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      json = Api::ImageLink.order(created_at: :desc).map do |link|
        link.attributes.merge(location: "/view/#{link.id}", tag_list: link.tag_list)
      end

      render json: json
    end

    def show
      render json: Api::ImageLink.find(params[:id])
    end

    def create
      permitted = params.permit(:full_url, tag_list: [])
      res = { json: { message: 'Invalid request' }, status: 400 }
      return render res unless %i[full_url tag_list].all?(&params.method(:key?))

      res = { json: { message: 'Link doesn\'t return an image' }, status: 400 }
      return render res unless valid_img_link?(permitted[:full_url])

      link = Api::ImageLink.new(permitted)
      link.save
      render json: link.attributes.merge(location: "/view/#{link.id}", tag_list: link.tag_list), status: 201
    end

    private

    def valid_img_link?(img_link)
      res = HTTParty.head(img_link, timeout: 3)
      res.code == 200 && res.headers['Content-Type'].start_with?('image/')
    end
  end
end
