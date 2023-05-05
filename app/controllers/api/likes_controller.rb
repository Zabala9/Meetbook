class Api::LikesController < ApplicationController
    def index
        @likes = Like.all
        render :index
    end

    def create
        
        @like_found = Like.find_by(post_id: like_params["post_id"], author_id: like_params["author_id"]);
        @like = Like.new(like_params)
        if @like_found
            render json: {errors: @like.errors.full_messages}, 
                status: :unprocessable_entity
        else
            @like.save
            render :show
        end
    end
    
    def show
        @like = Like.find_by(id: params[:id])
        if @like
            render :show
        else
            render json: {errors: @like.errors.full_messages}, 
                status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        if @like&.destroy
            head :no_content
        end
    end

    private
    def like_params
        params.require(:like).permit(:post_id, :author_id)
    end
end