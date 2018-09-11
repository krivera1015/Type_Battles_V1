class ChangeMatchesPlayerCountDefault < ActiveRecord::Migration[5.2]
  def change
    change_column :matches, :player_count, :integer, default: 1
  end
end
