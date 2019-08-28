class RenameTypeToCategory < ActiveRecord::Migration[5.2]
  def change
    remove_column :items, :type
    add_column :items, :category, :string
  end
end
