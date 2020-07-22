class Feedback < ApplicationRecord
  validates :name, presence: true, allow_blank: false
  validates :comment, presence: true, allow_blank: false
end
