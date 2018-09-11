class Match < ApplicationRecord
    has_many :matchmaking, dependent: :destroy
    has_many :users, through: :matchmaking

    before_destroy prepend: true do
        self.users.each {|user| user.toggle_in_match}
    end
end
