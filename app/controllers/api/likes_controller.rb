class Api::LikesController < ApplicationController
    def create
        @like = Like.new(like_params)

        if @like&.save
        end
    end

    def destroy
    end

    private
    def like_params
        params.require(:like).permit(:post_id, :author_id)
    end
end