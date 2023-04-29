class Api::LikesController < ApplicationController
    def index
        @likes = Like.all
        render :index
    end

    def create
        @prev_like = Like.find_by(post_id: like_params[:post_id])
        @like = Like.new(like_params)
        if @prev_like == nil || (@prev_like.post_id != @like.post_id && @prev_like.author_id != @like.post_id)
            @like&.save
            render :show
        else
            render json: {error: @like.errors.full_messages}, 
                status: :unprocessable_entity
        end
    end
    
    def show
        @like = Like.find_by(id: params[:id])
        if @like
            render :show
        else
            render json: {errors: @like.errors.full_messages}, 
                state: :unprocessable_entity
        end
    end

    def destroy
        # @prev_like = Like.find_by(post_id: like_params[:post_id])
        @like = Like.find_by(id: params[:id])
        # debugger
        if @prev_like&.destroy
            head :no_content
        end
    end

    private
    def like_params
        params.require(:like).permit(:post_id, :author_id)
    end
end