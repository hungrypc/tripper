class AddForeignKeys < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_trips, :user, index: true
    add_reference :user_trips, :trip, index: true
  end
end
