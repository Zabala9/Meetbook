class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + [:authorId, :photo]

    def index
        @posts = Post.all
        render :index
    end

    def create
        @post = Post.new(post_params)
        
        if @post.save
            # render :show
            render partial: "api/posts/post", locals: { post: @post }
        else
            render json: {errors: @post.errors.full_messages},
                status: :unprocessable_entity
        end
    end

    def show
        @post = Post.find_by(id: params[:id])
        if @post
            render :show
        else
            render json: {errors: ['Post not found.']},
                status: :unprocessable_entity
        end
    end

    def update
        @post = Post.find_by(id: params[:id])
        if @post&.update(post_params)
            render :show
        elsif !@post
            render json: ['Post not found.'], status: 400
        else
            render json: {errors: @post.errors.full_messages},
                status: :unprocessable_entity
        end
    end

    def destroy
        @post = Post.find_by(id: params[:id])
        if @post&.destroy
            head :no_content
        end
    end

    private
    def post_params
        params.require(:post).permit(:content, :author_id, :photo)
    end
end