class FixItemLatLng < ActiveRecord::Migration[5.2]
  def change
    remove_column :items, :lat
    remove_column :items, :lng 
    add_column :items, :lat, :decimal, :precision => 15, :scale => 10
    add_column :items, :lng, :decimal, :precision => 15, :scale => 10
  end
end
