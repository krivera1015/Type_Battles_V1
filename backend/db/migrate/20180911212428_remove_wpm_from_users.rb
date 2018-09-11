class RemoveWpmFromUsers < ActiveRecord::Migration[5.2]
    def change
        remove_column :users, :wpm
    end
end
