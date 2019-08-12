class MoreReferences < ActiveRecord::Migration[5.2]
  def change
    add_reference :days, :item, index: true
    add_reference :items, :day, index: true
  end
end
