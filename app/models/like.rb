# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  post_id    :bigint           not null
#  author_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    validates :post_id, :author_id, presence: true

    belongs_to :post,
    foreign_key: :post_id,
    class_name: :Post

    belongs_to :user,
    foreign_key: :author_id,
    class_name: :User,
end
