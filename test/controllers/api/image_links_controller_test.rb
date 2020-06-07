require 'test_helper'
require 'json'

module Api
  class ImageLinksControllerTest < ActionDispatch::IntegrationTest
    test 'should get all image links with LIFO order' do
      get api_image_links_url
      assert_response :success
      assert_equal 'application/json', @response.media_type
      json = JSON.parse(@response.body)
      assert_equal 'https://example.com/some_photo.jpg', json[0]['full_url']
      assert_equal json.length, 4
    end

    test 'should reject invalid param' do
      post api_image_links_url, params: { somerandomparam: 1 }
      assert_response 400
      assert_equal 'application/json', @response.media_type
    end

    test 'should reject invalid link' do
      post api_image_links_url, params: { full_url: 'https://cnn.com/randome.jpeg' }
      assert_response 400
      assert_equal 'application/json', @response.media_type
    end

    test 'should add link to db' do
      assert_difference 'ImageLink.count' do
        post api_image_links_url, params: { full_url: 'https://i.imgur.com/O0N6NyV.jpg' }
        assert_response 201
        assert_equal 'application/json', @response.media_type
      end
    end
  end
end
