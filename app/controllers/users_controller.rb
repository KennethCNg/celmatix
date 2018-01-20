class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
        # do nothing, great!
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    
    private
    
    def user_params
        params.require(:user).permit(:fname, :lname, :email,
        :age, :height, :weight, :favorite_color)
    end
end
