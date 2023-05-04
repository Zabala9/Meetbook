@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :content, :author_id
        json.photoUrl post.photo.attached? ? post.photo.url : ''
    end
end
