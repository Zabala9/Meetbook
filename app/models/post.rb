# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  content    :string           not null
#  author_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :content, :author_id, presence: true

    belongs_to :user,
    foreign_key: :author_id,
    class_name: :User

    has_many :comment,
    foreign_key: :post_id,
    class_name: :Comment,
    dependent: :destroy

    # has_many :likes,
    # foreign_key: :like_id,
    # class_name: :Like,
    # dependent: :destroy
end
