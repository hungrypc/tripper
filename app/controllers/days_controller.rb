class DaysController < ApplicationController
    def index
        @days = Day.where(trip_id: params[:trip_id])
        
        render :json => {
            days: @days
        }
    end

    def show
        @day = Day.find(params[:id])

        render :json => {
            item: @day
        }
    end

    def create 
        @trip = Trip.find(params[:trip_id])

        if(@trip)
            @day = Day.new()

            render :json => { message: "day created" }
        end
    end

    def destroy
    end
end
