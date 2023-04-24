json.array! @posts do |post|
    json.extrat! post, :id, :content, :author_id
end
