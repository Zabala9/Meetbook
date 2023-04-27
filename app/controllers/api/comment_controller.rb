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

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment&.update(comments_params)
            render :show
        elsif !@comment
            render json: ['Comment not found'], status: 400
        else
            render json: {errors: @comment.errors.full_messages},
                status: :unprocessable_entity
        end
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment&.destroy
            head :no_content
        end
    end

    private
    def comments_params
        params.require(:comment).permit(:content, :author_id, :post_id)
    end
end