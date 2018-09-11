class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :matchmaking do |t|
      t.integer :user_id
      t.integer :match_id

      t.timestamps
    end
  end
end
