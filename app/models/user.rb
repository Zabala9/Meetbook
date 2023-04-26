# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  lastname        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password
    
    validates :name, presence: true, length: {in: 2..15},
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :lastname, presence: true, length: {in: 2..15},
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, presence: true, uniqueness: true, length: {in: 5..255},
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: {in: 6..255}, allow_nil: true

    has_many :posts,
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy

    has_many :comments,
    foreign_key: :author_id,
    class_name: :Comment,
    dependent: :destroy

    has_many :likes,
    foreign_key: :author_id,
    class_name: :Like,
    dependent: :destroy

    before_validation :ensure_session_token

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password)
            user
        else
            nil
        end
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save
        self.session_token
    end

    private
    def generate_session_token
        token = SecureRandom::urlsafe_base64
        while User.exists?(session_token: token)
            token = SecureRandom::urlsafe_base64
        end
        token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end
end
