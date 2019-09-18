class UsersController < ApplicationController

    def create

        user = User.find_by(email: params["email"])

        render json: {
            users: user
        }

    end

    def index
    end

    def show
        
    end

    def user_params
        params.require(:users).permit(:email)
    end

end
