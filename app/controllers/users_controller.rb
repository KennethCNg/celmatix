class UsersController < ApplicationController
    def create
        user = User.new(user_params)
        debugger
        if user.save
        # do nothing, great!
        else
            render json: user.errors.full_messages, status: 422
        end
    end

    # custom route
    def verify
        if params[:name]
            validate_name
        elsif params[:email]
            validate_email
        elsif params[:bio]
            validate_bio
        elsif params[:color]
            validate_color
        end
        
        # checks errors
        if !(@errors.empty?) 
            render json: @errors, status: 422
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:fname, :lname, :email,
        :age, :height, :weight, :color, :bio)
    end
    
    def validate_name
        fname = params[:name][:fname]
        lname = params[:name][:lname]

        user = User.new(fname: fname, lname: lname)
        user.valid?

        fname_errors = user.errors.messages[:fname]
        lname_errors = user.errors.messages[:lname]
        @errors = []
        
        if !(fname_errors.empty?)
            @errors.push(fname_errors)
        elsif !(lname_errors.empty?)
            @errors.push(lname_errors)
        end
    end

    def validate_email
        email = params[:email][:email]
        user = User.new(email: email)
        @errors  = []
        user.valid?

        email_errors = user.errors.messages[:email]
        @errors = []
        @errors.push(email_errors) if !(email_errors.empty?)
    end

    def validate_bio
        age = params[:bio][:age]
        height = params[:bio][:height]
        user = User.new(age: age, height: height)
        @errors = []
        user.valid?

        age_errors = user.errors.messages[:age]
        height_errors = user.errors.messages[:height]

        @errors.push(age_errors) if !(age_errors.empty?)
        @errors.push(height_errors) if !(height_errors.empty?)
    end

    def validate_color
        color = params[:color][:color]
        user = User.new(color: color)
        @errors = []
        user.valid?

        color_errors = user.errors.messages[:color]

        @errors.push(color_errors) if !(color_errors.empty?)
    end

end
