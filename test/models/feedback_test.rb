require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  test 'fixture count' do
    assert_equal 2, Feedback.count
  end

  test 'find all' do
    all = Feedback.all
    assert_equal 2, all.count
  end

  test 'find one' do
    feedback = Feedback.find(1)
    assert_equal 'name1', feedback.name
  end
end
