ActionController::Cookies
class TripsController < ApplicationController

    def index
        @trip = Trip.find(params[:trip_id])
        @travels = @trip.travels
        
        render :json => {
            travels: @travels
        }
    end

    def show

        @trip = Trip.find(params[:id])
        # puts params

        render json: {
            trip: @trip,
            message: 'show trip'
        }
    end

    def create
        puts params
        puts params[:trip]
        @user =  User.find( params[:user_id])

        if(@user)
            @trip = Trip.new(user_params)
            puts user_params
            @trip_user = TripUser.new()

            # @trip.user = @user
    
            if @trip.save!
                @trip.users << @user
                # @trip_user.user = @user
                # @trip_user.trip = @trip
                # @trip_user.save
                render :json =>  @trip
             else
                render :json => { errors: @trip.errors }
            end

        end
    end

    private

    def user_params
        params.require(:trip).permit(:title, :location, :start_date, :end_date)
      end
  

end
