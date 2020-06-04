require 'test_helper'

module Api
  class ImageLinkTest < ActiveSupport::TestCase
    test 'fixture count' do
      assert_equal 2, ImageLink.count
    end

    test 'find all' do
      all = ImageLink.all
      assert_equal 2, all.count
      urls = ['https://appfolio.com/some_photo.jpg', 'https://google.com/some_photo.jpg']
      assert_equal urls, all.map(&:full_url)
    end

    test 'find one' do
      link = ImageLink.find(1)
      assert_equal 'https://appfolio.com/some_photo.jpg', link.full_url
    end
  end
end
