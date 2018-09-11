class RemoveWinnerIdFromMatches < ActiveRecord::Migration[5.2]
    def change
        remove_column :matches, :winner_id
    end
end
