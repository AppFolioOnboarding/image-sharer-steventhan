module Api
  class ImageLink < ApplicationRecord
    acts_as_taggable_on :tags
  end
end
