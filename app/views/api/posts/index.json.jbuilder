# @posts.each do |post|
#     json.set! post.id do
#         json.extract! post, :id, :content, :author_id
#         json.photoUrl post.photo.attached? ? post.photo.url : nil
#     end
# end

json.array! @posts do |post|
    json.partial! 'api/posts/post', post: post
end
