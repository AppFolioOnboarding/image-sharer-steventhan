require 'test_helper'

class ReactControllerTest < ActionDispatch::IntegrationTest
  test "should render the react app" do
    get "/"
    assert_response :success
    assert_equal 200, response.status
    assert_react_component "App"
  end
end
