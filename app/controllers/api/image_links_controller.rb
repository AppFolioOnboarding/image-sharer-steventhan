module Api
  class ImageLinksController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      if params.key?(:tag)
        render json: ImageLink.tagged_with(params[:tag])
      else
        render json: ImageLink.order(created_at: :desc)
      end
    end

    def show
      render json: ImageLink.find(params[:id])
    end

    def create
      permitted = params.permit(:full_url, tag_list: [])
      link = ImageLink.new(permitted)
      if link.save
        render json: link, status: 201
      else
        render json: { message: link.errors.full_messages[0] }, status: 400
      end
    end

    def destroy
      link = ImageLink.find(params[:id])
      link.destroy
    end
  end
end
