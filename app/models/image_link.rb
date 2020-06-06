class ImageLinkValidator < ActiveModel::Validator
  def validate(link)
    if link.full_url.nil?
      link.errors[:full_url] << 'missing'
    elsif !valid_img_link?(link.full_url.to_s)
      link.errors[:full_url] << 'doesn\'t return an image'
    end
  end

  def valid_img_link?(img_link)
    res = HTTParty.head(img_link, timeout: 3)
    res.code == 200 && res.headers['Content-Type'].start_with?('image/')
  rescue StandardError
    false
  end
end

class ImageLink < ApplicationRecord
  include ActiveModel::Validations
  validates_with ImageLinkValidator
  acts_as_taggable_on :tags
end
