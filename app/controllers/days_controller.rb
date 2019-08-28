class DaysController < ApplicationController
    def index

        @days = Day.where(trip_id: params[:trip_id])
        
        render :json => {
            days: @days
        }
    end

    def show

        puts "SHOW DAY PARAMS"
        puts params
        puts "END"

        @day = Day.find(params[:id])

        render :json => {
            day: @day
        }
    end

    def create 
        @trip = Trip.find(params[:trip_id])

        if(@trip)
            @day = Day.new(trip_id: params[:trip_id])

            if(@day.save)
                render :json => { 
                    message: "day created", 
                    day: @day
                }
            end
        end
    end

    def destroy
    end
end
