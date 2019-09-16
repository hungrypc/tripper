class FixLatLng < ActiveRecord::Migration[5.2]
  def change
    remove_column :trips, :lat
    remove_column :trips, :lng 
    add_column :trips, :lat, :decimal, :precision => 15, :scale => 10
    add_column :trips, :lng, :decimal, :precision => 15, :scale => 10
  end
end
