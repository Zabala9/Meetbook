json.user do
    json.extract! @user, :id, :name, :lastname, :email, :created_at, :updated_at
end
