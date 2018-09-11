class AddInMatchColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :in_match, :boolean, default: false
  end
end
