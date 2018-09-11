class AddPlayersCountToMatches < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :player_count, :integer, default: 0
  end
end
