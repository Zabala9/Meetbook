@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :content, :author_id, :created_at
        json.photoUrl post.photo.attached? ? post.photo.url : nil
    end
end
