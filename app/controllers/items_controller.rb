class ItemsController < ApplicationController
    def index
        @trip = Trip.find(params[:trip_id])
        @items = @trip.items
        
        render :json => {
            activities: @item
        }
    end

    def show
        @item = Item.find(params[:id])

        render :json => {
            item: @item
        }
    end

    def create
        @item = Item.new(user_params)
        @item.trip = Trip.find(params[:trip_id])

        if @item.save!
            render :json => @item
         else
            render :json => {errors: @item.errors }
        end
        
    end


    def destroy
        @item = Item.find_by(id: params[:id])
        @item.destroy
    end



    private

    def user_params
        params.require(:item).permit(:title, :location, :date, :description, :lat, :long)
    end
end
