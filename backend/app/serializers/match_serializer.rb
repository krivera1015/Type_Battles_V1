class MatchSerializer < ActiveModel::Serializer
    attributes :id, :winner_id, :player_count, :completed
    has_many :matchmaking
end
