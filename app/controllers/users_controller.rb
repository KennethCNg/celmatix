class UsersController < ApplicationController
    def create
        user = User.new(user_params)
        if user.save
        # do nothing, great!
        else
            render json: user.errors.full_messages, status: 422
        end
    end

    def verify
        if params[:name]
            validate_name
        elsif params[:email]
            validate_email
        elsif params[:bio]
            validate_bio
        end
        
        # checks errors
        if !(@errors.empty?)   
            render json: @errors, status: 422
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:fname, :lname, :email,
        :age, :height, :weight, :favorite_color)
    end

    def validate_name
        first_name = params[:name][:fname]
        last_name = params[:name][:lname]

        user = User.new(fname: first_name, lname: last_name)
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
        email = params[:email]
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
        weight = params[:bio][:weight]
        user = User.new(age: age, height: height, weight: weight)
        @errors  = []
        user.valid?

        age_errors = user.errors.messages[:age]
        height_errors = user.errors.messages[:height]
        weight_errors = user.errors.messages[:weight]

        @errors.push(age_errors) if !(age_errors.empty?)
        @errors.push(height_errors) if !(height_errors.empty?)
        @errors.push(weight_errors) if !(weight_errors.empty?)
    end

end
