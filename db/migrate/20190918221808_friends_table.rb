class FriendsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :user_friends do |t|
      
      t.timestamps
    end

    add_reference :user_friends, :user, index: true
    add_reference :user_friends, :friend, index: true

  end
end
