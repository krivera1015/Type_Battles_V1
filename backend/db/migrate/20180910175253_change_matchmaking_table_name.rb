class ChangeMatchmakingTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :matchmaking, :matchmakings
  end
end
