class Trip < ApplicationRecord
    has_many :user_trips
    has_many :users, through: :user_trips
    has_many :days

    validates :title, presence: true
    validates :location, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
end
