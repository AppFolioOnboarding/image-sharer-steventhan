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

    test 'should reject missing full_url' do
      params = {
        tag_list: %w[tag1 tag2]
      }
      post api_image_links_url, params: params
      assert_response 400
      assert_equal 'application/json', @response.media_type
    end

    test 'should accept missing tag_list' do
      params = {
        full_url: 'https://i.imgur.com/O0N6NyV.jpg'
      }
      post api_image_links_url, params: params
      assert_response 201
      assert_equal 'application/json', @response.media_type
    end

    test 'should reject invalid link' do
      post api_image_links_url, params: { full_url: 'https://cnn.com/random.jpeg' }
      assert_response 400
      assert_equal 'application/json', @response.media_type
    end

    test 'should add link to db' do
      assert_difference 'ImageLink.count', 1 do
        params = {
          full_url: 'https://i.imgur.com/O0N6NyV.jpg',
          tag_list: %w[tag1 tag2]
        }
        post api_image_links_url, params: params
        assert_response 201
        assert_equal 'application/json', @response.media_type
      end
    end

    test 'should get link if exists' do
      get api_image_links_url(ImageLink.first)
      assert_response 200
    end

    test 'should returns 404 if link does not exists' do
      assert_raises(ActiveRecord::RecordNotFound) do
        get api_image_links_url + '/abcd'
      end
    end

    test 'should delete link if exists' do
      assert_difference 'ImageLink.count', -1 do
        delete "/api/image-links/#{ImageLink.first.id}"
        assert_response 204
      end
    end

    test 'should returns 404 trying to delete non-exsist link' do
      assert_raises(ActiveRecord::RecordNotFound) do
        delete api_image_links_url + '/abcd'
      end
    end
  end
end
