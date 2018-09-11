class AddCompletedToMatchesTable < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :completed, :boolean
  end
end
