class FixTripLocation < ActiveRecord::Migration[5.2]
  def change
    remove_column :trips, :description
    add_column :trips, :location, :string
  end
end
