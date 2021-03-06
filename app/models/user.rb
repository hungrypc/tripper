class User < ApplicationRecord
    has_secure_password

    has_many :user_trips
    has_many :trips, through: :user_trips

    validates :email, presence: true, uniqueness: { case_sensitive: false }
    validates :name, presence: true
    validates :password, presence: true
    validates :password, length: { minimum: 6 }
    validates :password_confirmation, confirmation: true

end
