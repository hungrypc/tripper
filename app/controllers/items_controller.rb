class ItemsController < ApplicationController
    def index
        @items = Item.where(day_id: params[:day_id])
        
        render :json => {
            items: @items
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

        if @item.save!
            render :json => { item: @item }
         else
            render :json => { errors: @item.errors }
        end
        
    end


    def destroy
        @item = Item.find_by(id: params[:id])
        @item.destroy
    end



    private

    def user_params
        params.require(:item).permit(:title, :description, :day_id, :category, :lat, :lng)
    end
end
