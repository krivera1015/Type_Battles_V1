class AddDefaultsToMatchesTable < ActiveRecord::Migration[5.2]
    def change
        change_column :matches, :completed, :boolean, default: false
    end
end
