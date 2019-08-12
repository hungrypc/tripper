class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :title
      t.text :description
      t.decimal :lat
      t.decimal :lng

      t.timestamps
    end
  end
end
