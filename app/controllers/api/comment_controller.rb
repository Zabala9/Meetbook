class Api::CommentController < ApplicationController
    def index
        @comments = Comment.all
        render :index
    end

    def create
        @comment = Comment.new(comments_params)
        if @comment&.save
            render :show
        else
            render json: {error: @comment.errors.full_messages},
                status: :unprocessable_entity
        end
    end

    private
    def comments_params
        params.require(:comment).permit(:content, :author_id, :post_id)
    end
end