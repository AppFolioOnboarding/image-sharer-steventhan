require 'test_helper'
require 'json'

module Api
  class FeedbacksControllerTest < ActionDispatch::IntegrationTest
    test 'should reject invalid param' do
      assert_raises(ActionController::ParameterMissing) do
        post api_feedbacks_url, params: { somerandomparam: 1 }
        assert_response 400
        assert_equal 'application/json', @response.media_type
      end
    end

    test 'should reject missing name' do
      params = {
        feedback: {
          comment: 'comment'
        }
      }
      post api_image_links_url, params: params
      assert_response 400
      assert_equal 'application/json', @response.media_type
    end

    test 'should reject missing comment' do
      params = {
        feedback: {
          name: 'name'
        }
      }
      post api_image_links_url, params: params
      assert_response 400
      assert_equal 'application/json', @response.media_type
    end

    test 'should store feedback in db' do
      params = {
        feedback: {
          name: 'name',
          comment: 'comment'
        }
      }
      assert_difference 'Feedback.count' do
        post api_feedbacks_url, params: params
        assert_response 200
        assert_equal 'application/json', @response.media_type
      end
    end
  end
end
