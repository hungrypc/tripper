ActionController::Cookies
class TripsController < ApplicationController

    def index
    
        @trips = User.find(params[:user_id]).trips
        
        render :json => {
            trips: @trips
        }
    end

    def show

        @trip = Trip.find(params[:id])
        puts params

        render json: {
            trip: @trip,
            message: 'show trip'
        }
    end

    def create
        # puts params
        # puts params[:trip]
        @user =  User.find( params[:user_id] )

        if(@user)
            @trip = Trip.new(user_params)
            puts "PUTS @TRIP"
            puts @trip
            @trip_user = UserTrip.new()

            # @trip.users = @user
    
            if @trip.save
                # @trip.save!
                @trip.users << @user
                @trip_user.user = @user
                @trip_user.trip = @trip
                # @trip_user.save
                render :json => { trip: @trip }
             else
                render :json => { errors: @trip.errors }
            end

        end
    end

    private

    def user_params
        params.require(:trip).permit(:title, :location, :start_date, :end_date, :lat, :lng)
    end
  

end
