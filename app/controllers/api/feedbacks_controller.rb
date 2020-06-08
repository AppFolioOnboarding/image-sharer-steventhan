module Api
  class FeedbacksController < ApplicationController
    protect_from_forgery with: :null_session

    def create
      permitted = params.require(:feedback).permit(:name, :comment)
      feedback = Feedback.new(permitted)
      if feedback.save
        render json: feedback
      else
        render json: { message: feedback.errors.full_messages[0] }, status: 400
      end
    end
  end
end
