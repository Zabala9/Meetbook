# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :string           not null
#  author_id  :bigint           not null
#  post_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :content, :author_id, :post_id, presence: true

    belongs_to :post,
    foreign_key: :post_id,
    class_name: :Post

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User
end
