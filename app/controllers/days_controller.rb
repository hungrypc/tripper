class DaysController < ApplicationController
    def index

        puts "DAYS INDEX PARAMS"
        puts params
        puts "END"

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
