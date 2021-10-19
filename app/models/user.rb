class User < ApplicationRecord
  has_secure_password
  attr_accessor :remember_token
  has_many :categories, dependent: :destroy
  has_many :shop_lists, dependent: :destroy
  EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :last_name, presence: true, length: { maximum: 20 }
  validates :first_name, presence: true, length: { maximum: 20 }
  validates :email, presence: true, length: { maximum: 256 }, uniqueness: true, format: { with: EMAIL_FORMAT}
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true, length: { minimum: 6 }

  def select_column
    return { id: self.id, last_name: self.last_name, first_name: self.first_name, email: self.email, created_at: self.created_at }
  end

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(self.remember_token))
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end
end
