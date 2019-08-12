class FixFk < ActiveRecord::Migration[5.2]
  def change
    remove_reference :days, :item, index: true
    add_reference :days, :trip, index: true
  end
end
