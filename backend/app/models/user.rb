class User < ApplicationRecord
    has_many :matchmaking
    has_many :matches, through: :matchmaking

        def toggle_in_match()
            begin
                self.update(in_match: !self.in_match)
            rescue ActiveRecord::RecordNotFound
                render json: {error: "User #{self.id} does not exist"}, status: 400
            end
        end
end
