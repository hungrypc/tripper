class DaysController < ApplicationController
    def index
        @days = Day.all
        
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
    end

    def destroy
    end
end
