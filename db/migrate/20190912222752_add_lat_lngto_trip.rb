class AddLatLngtoTrip < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :lat, :decimal
    add_column :trips, :lng, :decimal
  end
end
