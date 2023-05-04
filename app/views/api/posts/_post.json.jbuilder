json.extract! post, :id, :content, :author_id
json.photoUrl post.photo.attached? ? post.photo.url : nil