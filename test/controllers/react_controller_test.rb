require 'test_helper'

class ReactControllerTest < ActionDispatch::IntegrationTest
  test "should get app" do
    get "/"
    assert_response :success
  end
end
